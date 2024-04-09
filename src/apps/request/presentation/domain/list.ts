import { Asset } from "./Asset/Asset";
import { AssetRequest } from "./AssetRequest/AssetRequest";
import { Department } from "./Department/Department";
import { Role, User } from "./User/User";



export const initalDepartments:Department[] = [
    {
      id: "department_1",
      name: "Engineering",
      manager :{
        id: "user_1",
        email: "user1@example.com",
        firstName: "John",
        lastName: "Doe",
        role: Role.Manager,
     
        // organizationId: "org_1",
      
      },
      staff:["user_1"] // Use manager iundefinedf manager undefined    staff: ["user_3", "user_8"], // Array of user IDs for staff
    },
    {
      id: "department_2",
      name: "Sales",
      manager:   {
        id: "user_1",
        email: "user1@example.com",
        firstName: "John",
        lastName: "Doe",
        role: Role.Manager,
        // organizationId: "org_1",
       
      },
      staff: [],
    },
    {
      id: "department_3",
      name: "Marketing",
      manager: undefined,
      staff: [],
    },
    {
      id: "department_4",
      name: "Human Resources",
      manager: undefined, // No manager assigned yet
      staff: [],
    },
    {
      id: "department_5",
      name: "Finance",
      manager:   {
        id: "user_1",
        email: "user1@example.com",
        firstName: "John",
        lastName: "Doe",
        role: Role.Manager,
        // organizationId: "org_1",
       
      },
      staff: [], // No staff assigned yet
    },
    // Add more department objects following the same structure
  ];
export const initalStaffs:User[] = [
  {
    id: "user_1",
    email: "user1@example.com",
    firstName: "John",
    lastName: "Doe",
    role: Role.Manager,
    department: initalDepartments[0]
    // organizationId: "org_1",
   
  },
  {
    id: "user_2",
    email: "user2@example.com",
    firstName: "Jane",
    lastName: "Smith",
    role: Role.Admin,
    // organizationId: "org_2",
    department: initalDepartments[0]
    
  },
  {
    id: "user_3",
    email: "user3@example.com",
    firstName: "Michael",
    lastName: "Lee",
    role: Role.Admin,
    // organizationId: "org_1",
    
  },
  {
    id: "user_4",
    email: "user4@example.com",
    firstName: "Sarah",
    lastName: "Garcia",
    role: Role.Admin,
    // organizationId: "org_2",
    
  },
  {
    id: "user_5",
    email: "user5@example.com",
    firstName: "David",
    lastName: "Kim",
    role: Role.Admin,
    // organizationId: "org_3",
    
  },
  {
    id: "user_6",
    email: "user6@example.com",
    firstName: "Amanda",
    lastName: "Robinson",
    role: Role.Admin,
    // organizationId: "org_3",
    
  },
  {
    id: "user_7",
    email: "user7@example.com",
    firstName: "Charles",
    lastName: "Young",
    role: Role.Admin,
    // organizationId: "org_1",
    
  },
  {
    id: "user_8",
    email: "user8@example.com",
    firstName: "Ashley",
    lastName: "Nguyen",
    role: Role.Admin,
    // organizationId: "org_2",
    
  },
  {
    id: "user_9",
    email: "user9@example.com",
    firstName: "William",
    lastName: "Brown",
    role: Role.Admin,
    // organizationId: "org_3",
      },
  {
    id: "user_10",
    email: "user10@example.com",
    firstName: "Jennifer",
    lastName: "Davis",
    role: Role.Admin,
    // organizationId: "org_1",
    
  },
];

  export    const initalAssets = [
        {
          id: "asset_1",
          title:"asset",
          type: "Image",
          addDateTime: new Date("2024-03-18T10:00:00Z"), // Use ISO 8601 for date and time
          owner: undefined,
          active: true,
        },
        {
          id: "asset_2",
          title:"asset",
          type: "Document",
          addDateTime: new Date("2024-03-18T10:00:00Z"),
          owner: initalStaffs[1],
          active: false,
        },
        {
          id: "asset_3",
          title:"asset",
          type: "Video",
          addDateTime: new Date("2024-03-18T10:00:00Z"),
          owner: undefined, // No ownerId assigned
          active: true,
        },
        {
          id: "asset_4",
          title:"asset",
          type: "Audio",
          addDateTime:new Date("2024-03-18T10:00:00Z"), // Omit time for simpler date
          owner:undefined,
          active: true,
        },
        {
          id: "asset_5",
          title:"asset",
          type: "Image",
          addDateTime: new Date("2024-03-18T10:00:00Z"),
          owner:initalStaffs[0],
          active: false,
        },
        // Add more asset objects following the same structure
      ];
   export   const initalRequest = [
        {
          id: "request_4",
          createDatetime: new Date("2024-03-18T10:00:00Z"),
          resolveDatetime: new Date("2024-03-18T11:15:00Z"),
          approved: false,
          user: initalStaffs[0],
          asset: initalAssets[0],  // No asset ID for new asset request
          type: "New Asset",
          quantity: 2,  // Requesting 2 new assets
          rejected: false,
          rejectionReason: undefined,
          questionReason:undefined
        },
        {
          id: "request_5",
          createDatetime: new Date("2024-03-18T11:15:00Z"),
          resolveDatetime: new Date("2024-03-18T11:15:00Z"),
          approved: false,
          user: initalStaffs[0],
          assetId: "asset_2",  // Requesting maintenance for existing asset
          type: "Existing Asset",
          quantity: 1,  // Quantity of 1 (implicitly understood for existing asset)
          rejected: false,
          rejectionReason: undefined,
          questionReason:undefined
        },
        {
            id: "request_6",
            createDatetime: new Date("2024-03-18T11:15:00Z"),
            resolveDatetime: undefined,
            approved: false,
            user: initalStaffs[0],
            assetId: "asset_1",  // Requesting maintenance for existing asset
            rejected: false,
            rejectionReason: undefined,
          },
      ];
export const initalAssetRequest:AssetRequest[] = [
    {
        id: "request_3",
        createDatetime: new Date("2024-03-18T10:00:00Z"),
        resolveDatetime:undefined,
        approved: false,
        user: initalStaffs[0],
        asset: initalAssets[0],  // No asset ID for new asset request
        // type: "New Asset",
        // quantity: 2,  // Requesting 2 new assets
        rejected: false,
        rejectionReason: undefined,
        questionReason:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe omnis id aperiam? Sunt, minima. Facere in ullam ut quam modi.",

      
      },
      {
        id: "request_5",
        createDatetime: new Date("2024-03-18T11:15:00Z"),
        resolveDatetime: new Date("2024-03-18T11:15:00Z"),
        approved: true,
        user: initalStaffs[0],
        asset: initalAssets[1],  // Requesting maintenance for existing asset
        // type: "Existing Asset",
        // quantity: 1,  // Quantity of 1 (implicitly understood for existing asset)
        rejected: false,
        rejectionReason: undefined,
        approvedReason:"It needed",
        questionReason:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe omnis id aperiam? Sunt, minima. Facere in ullam ut quam modi.",
      },
      {
        id: "request_6",
        createDatetime: new Date("2024-03-18T11:15:00Z"),
        resolveDatetime: new Date("2024-03-18T11:15:00Z"),
        approved: false,
        user: initalStaffs[0],
        asset: initalAssets[1],  // Requesting maintenance for existing asset
        // type: "Existing Asset",
        // quantity: 1,  // Quantity of 1 (implicitly understood for existing asset)
        rejected: true,
        
        rejectionReason:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe omnis id aperiam? Sunt, minima. Facere in ullam ut quam modi.",
        questionReason:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe omnis id aperiam? Sunt, minima. Facere in ullam ut quam modi.",
      },
]
export const initalMaintenanceRequest = [
            {
            id: "request_6",
            createDatetime: new Date("2024-03-18T11:15:00Z"),
            resolveDatetime: undefined,
            approved: false,
            user: initalStaffs[0],
            asset: initalAssets[0],  // Requesting maintenance for existing asset
            rejected: false,
            rejectionReason: undefined,
            questionReason:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe omnis id aperiam? Sunt, minima. Facere in ullam ut quam modi.",
          },
          {
            id: "request_7",
            createDatetime: new Date("2024-03-18T11:15:00Z"),
            resolveDatetime: undefined,
            approved: false,
            user: initalStaffs[0],
            asset: initalAssets[0],  // Requesting maintenance for existing asset
            rejected: false,
            rejectionReason: undefined,
            questionReason:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe omnis id aperiam? Sunt, minima. Facere in ullam ut quam modi.",
          },
          {
            id: "request_8",
            createDatetime: new Date("2024-03-18T11:15:00Z"),
            resolveDatetime: undefined,
            approved: false,
            user: initalStaffs[0],
            asset: initalAssets[0],  // Requesting maintenance for existing asset
            rejected: false,
            rejectionReason: undefined,
            questionReason:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe omnis id aperiam? Sunt, minima. Facere in ullam ut quam modi.",
          },
         
]
export const LoggedUser:User={
  
  id: "user_1",
  email: "user1@example.com",
  firstName: "John",
  lastName: "Doe",
  role: Role.Admin,
  department: initalDepartments[0]
  // organizationId: "org_1",
 

}
// export const categoryList: Category[] = [
//   { id: 'food', title: 'Food' },
//   { id: 'electronics', title: 'Electronics' },
//   { id: 'clothing', title: 'Clothing' },
//   { id: 'home_and_garden', title: 'Home & Garden' },
//   { id: 'beauty', title: 'Beauty' },
//   { id: 'health_and_wellness', title: 'Health & Wellness' },
//   { id: 'toys_and_games', title: 'Toys & Games' },
//   { id: 'sports_and_outdoors', title: 'Sports & Outdoors' },
//   { id: 'books_and_music', title: 'Books & Music' },
//   { id: 'travel', title: 'Travel' },
// ];