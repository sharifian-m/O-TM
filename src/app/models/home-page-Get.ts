
    export interface Child2 {
        id: number;
        level: number;
        categoryName: string;
        categoryTitle: string;
        parentId: number;
        children: any[];
    }

    export interface Child {
        id: number;
        level: number;
        categoryName: string;
        categoryTitle: string;
        parentId: number;
        children: Child2[];
    }

    export interface CategoriesMenu {
        id: number;
        level: number;
        categoryName: string;
        categoryTitle: string;
        parentId?: any;
        children: Child[];
    }

    export interface MainCategory {
        categoryName: string;
        categoryTitle: string;
        parentId: number;
        categoryImageUrl: string;
        categoryIcon: string;
        id: number;
    }

    export interface Brand {
        name: string;
        title: string;
        imageUrl: string;
        description: string;
        ownerName: string;
        ownerCompany: string;
        ownerIdentifier: string;
        ownerId: number;
        index: number;
        score: number;
        minimumOrderAmont: number;
        maximumOrderAmont: number;
        minimumOrderCount: number;
        maximumOrderCount: number;
        isLimitByAmount: boolean;
        isLimitByOrder: boolean;
        mandatoryNationalCode: boolean;
        hasSellBox: boolean;
        isActive: boolean;
        isWaitingForProduct: boolean;
        orderCount: number;
        ignore: boolean;
        itemList?: any;
        id: number;
    }

    export interface Slider {
        name: string;
        title: string;
        imageUrl: string;
        width: string;
        height: string;
        sliderType: number;
        link: string;
        brandId?: number;
        itemId?: any;
        order: number;
        id: number;
    }

    export interface Product {
        imageUrl: string;
        name: string;
        title: string;
        subTitle: string;
        description: string;
        currentPrice: number;
        oldPrice: number;
        weight: string;
        height: string;
        customerType: number;
        cusromerName?: any;
        code: string;
        supplierName?: any;
        supplierTitle?: any;
        supplierId?: any;
        targetIdentifier: string;
        uniqIndentifier: string;
        supplierIdentifier: string;
        brandId: number;
        brandName: string;
        brandLogoUrl?: any;
        isSellingStoped: boolean;
        isHiddenBySupplier: boolean;
        isWaitingFroValidation: boolean;
        finalValidationState: boolean;
        finalValidationDescription: string;
        valuePerUnit: string;
        unit: number;
        sellType: number;
        minimuneOrderCount: number;
        maximumOrderCount: number;
        unValidateReason: string;
        createtionTimeStr: string;
        creationTime: Date;
        creditDescription: string;
        sellPrice: number;
        consumerPrice: number;
        timeToArriveDesc: string;
        operationLicense: string;
        healthLicensing: string;
        standardBadge: string;
        activityPermission: string;
        maintenance: string;
        referenceConditions: string;
        cusromerTypesEnumstr?: any;
        unitEnumstr?: any;
        sellTypeEnumstr?: any;
        customerMobileNumber?: any;
        countForCart: number;
        itemCategoryList?: any;
        barcode: string;
        isVisibleForConsumers: boolean;
        isVisibleForSuppliers: boolean;
        isNewestItem: boolean;
        hasInstantDelivery: boolean;
        onlyGoodsInStock: boolean;
        hasSellBox: boolean;
        hasReferenceConditions: boolean;
        categores?: any;
        specialTermsOfSale?: any;
        isSupplierPrice: boolean;
        requiredRoleCode: boolean;
        hasDiscount: boolean;
        discountPercent: number;
        discountStartDate?: any;
        discountEndDate?: any;
        appliedDiscount?: boolean;
        hasSupplier: boolean;
        score: number;
        hasPromotion: boolean;
        promotions: any[];
        id: number;
    }

    export interface Content {
        name: string;
        image: string;
        image2: string;
        backgroundColor: string;
        textColor: string;
        tag: string;
        height: number;
        specialItemEnum: number;
        products: Product[];
        banners?: any;
    }

   
    export interface ItemsByCategory {
        name: string;
        image: string;
        image2?: any;
        backgroundColor?: any;
        textColor?: any;
        tag: string;
        height: number;
        specialItemEnum?: any;
        products: Product[];
        banners?: any;
    }

    export interface Result {
        categoriesMenu: CategoriesMenu[];
        mainCategories: MainCategory[];
        brands: Brand[];
        slider: Slider[];
        contents: Content[];
        itemsByCategory: ItemsByCategory[];
        user?: any;
    }

    export interface RootObject {
        result: Result;
        targetUrl?: any;
        success: boolean;
        error?: any;
        unAuthorizedRequest: boolean;
        __abp: boolean;
    }


