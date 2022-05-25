// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
//import '@openzeppelin/contracts/metatx/ERC2771Context.sol';
import "@openzeppelin/contracts/utils/Counters.sol";
import "@opengsn/contracts/src/BaseRelayRecipient.sol";


contract MyNFT is BaseRelayRecipient, ERC721URIStorage{

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping(address => bool) private metaTxnEligible;

    //Overriding the versionRecipient function in IRelayRecipient.sol
	string public override versionRecipient = "1.0.0";


    constructor(address _forwarder) ERC721('MYNFT','MYMY') {
        BaseRelayRecipient._setTrustedForwarder(_forwarder);
    }


    function _msgSender() internal view override(Context,BaseRelayRecipient) returns(address sender){
        return BaseRelayRecipient._msgSender();
    }

    function _msgData() internal view override(Context, BaseRelayRecipient) returns(bytes calldata){
        return BaseRelayRecipient._msgData();
    }

    function mintNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {

        if(msg.sender == trustedForwarder()){
            require(!metaTxnEligible[_msgSender()],'1 gasless txn allowed');
        }
        metaTxnEligible[_msgSender()] = true;
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
    
}