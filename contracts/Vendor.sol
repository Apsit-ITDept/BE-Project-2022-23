// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Roles.sol";

contract Vendor {
  using Roles for Roles.Role;

  event VendorAdded(address indexed _account);
  event VendorRemoved(address indexed _account);

  Roles.Role private vendorsList;

  constructor() public {
    vendorsList.addRole(msg.sender);
    emit VendorAdded(msg.sender);
  }

  ///@dev Modifiers for Vendor.
  modifier onlyVendor() {
    require(isVendor(msg.sender));
    _;
  }
  /*-----------------------------*/

  ///@dev Vendor Utility functions.
  function isVendor(address _account) public view returns (bool) {
    return vendorsList.hasRole(_account);
  }

  function addVendor(address _account) public onlyVendor {
    vendorsList.addRole(_account);
    emit VendorAdded(_account);
  }

  function removeVendor() public {
    vendorsList.removeRole(msg.sender);
    emit VendorRemoved(msg.sender);
  }
  /*-----------------------------*/

}