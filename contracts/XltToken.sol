// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract XltToken is ERC20 {
    uint public INITIAL_SUPPLY = 1200000;
    uint private constant INVERSE_BASIS_POINT = 10000000000;
    uint public klayInDollar = 2047073300;

    constructor() ERC20("XLT Token", "XLT") {
        
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    event buyXltEvent(uint _amount, address _buyer);
    
    function buyXlt() external payable {
        // msg.sender, msg.value * klayInDollar / INVERSE_BASIS_POINT 가 1 보다 작아지면 안됨.
        require(msg.value >= 5);
        _mint(msg.sender, msg.value * klayInDollar / INVERSE_BASIS_POINT);
        
        emit buyXltEvent( msg.value * klayInDollar / INVERSE_BASIS_POINT, msg.sender);
    }
}