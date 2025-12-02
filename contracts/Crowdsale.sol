// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Crowdsale is Ownable {
    IERC20 public token;
    uint256 public rate;

    constructor(address tokenAddress, uint256 _rate) Ownable(msg.sender) {
        token = IERC20(tokenAddress);
        rate = _rate;
    }

    function buyTokens() public payable {
        uint256 amount = msg.value * rate;
        require(token.balanceOf(address(this)) >= amount, "Not enough tokens in contract");
        token.transfer(msg.sender, amount);
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
