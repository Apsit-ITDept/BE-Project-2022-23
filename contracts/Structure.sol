// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

library Structure {
    enum State {
        Manufactured,
        PurchasedByVendor,
        ShippedByManufacturer,
        ReceivedByVendor,
        PurchasedByCustomer,
        ShippedByVendor,
        ReceivedByDeliveryHub,
        ShippedByDeliveryHub,
        ReceivedByCustomer
    }
    struct ManufactureDetails {
        address manufacturer;
        string manufacturerName;
        string manufacturerDetails;
        string manufacturerLongitude;
        string manufacturerLatitude;
        uint256 manufacturedDate;
    }
    struct ProductDetails {
        string productName;
        uint256 productCode;
        uint256 productPrice;
        string productCategory;
    }
    struct VendorDetails {
        address vendor;
        string vendorLongitude;
        string vendorLatitude;
    }
    struct DeliveryHubDetails {
        address deliveryHub;
        string deliveryHubLongitude;
        string deliveryHubLatitude;
    }
    struct Product {
        uint256 uid;
        uint256 sku;
        address owner;
        State productState;
        ManufactureDetails manufacturer;
        VendorDetails vendor;
        ProductDetails productdet;
        DeliveryHubDetails deliveryhub;
        address customer;
        string transaction;
    }

    struct ProductHistory {
        Product[] history;
    }

    struct Roles {
        bool Manufacturer;
        bool Vendor;
        bool DeliveryHub;
        bool Customer;
    }
}
