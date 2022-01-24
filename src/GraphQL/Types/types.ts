import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CashbackInfo = {
  __typename?: 'CashbackInfo';
  cashBack: Scalars['Int'];
  fee: Scalars['Int'];
  minPayment: Scalars['Int'];
};

export type LightProduct = {
  __typename?: 'LightProduct';
  _id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  productID: Scalars['ID'];
  shop: Shop;
  shopID: Scalars['ID'];
  shopName: Scalars['String'];
  status: Scalars['String'];
  weight: Scalars['Float'];
};

export type LightShop = {
  __typename?: 'LightShop';
  _id: Scalars['ID'];
  cashbackInfo: CashbackInfo;
  categories: Array<Scalars['String']>;
  image: Scalars['String'];
  isActive: Scalars['Boolean'];
  likes: Scalars['Int'];
  location: Location;
  name: Scalars['String'];
  openDays: Scalars['String'];
  openHours: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  coordinates: Array<Maybe<Scalars['Float']>>;
  type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  accountLink?: Maybe<Scalars['String']>;
  activateShop: Scalars['Boolean'];
  addToCart: Scalars['Boolean'];
  changeProductStatus: Scalars['Boolean'];
  createOrder: Scalars['String'];
  createProduct?: Maybe<Product>;
  createShop?: Maybe<Scalars['ID']>;
  createStripeAccount?: Maybe<Scalars['ID']>;
  createUser: Scalars['Boolean'];
  deleProduct: Scalars['Boolean'];
  disactivateShop: Scalars['Boolean'];
  like: Scalars['Boolean'];
  newFCM: Scalars['Boolean'];
  paymentIntent?: Maybe<PaymentIntent>;
  stripePayment?: Maybe<Scalars['String']>;
  updateProduct: Scalars['Boolean'];
  updateShop: Scalars['Boolean'];
};


export type MutationAccountLinkArgs = {
  accountID: Scalars['ID'];
};


export type MutationActivateShopArgs = {
  id: Scalars['ID'];
};


export type MutationAddToCartArgs = {
  firebaseUserID: Scalars['String'];
  productID: Scalars['ID'];
  quantity: Scalars['Int'];
};


export type MutationChangeProductStatusArgs = {
  firebaseCompanyID: Scalars['String'];
  id: Scalars['ID'];
  status: Scalars['String'];
};


export type MutationCreateOrderArgs = {
  options: OrderInput;
  paymentIntentID: Scalars['ID'];
};


export type MutationCreateProductArgs = {
  firebaseCompanyID: Scalars['String'];
  input: ProductInput;
};


export type MutationCreateShopArgs = {
  input: ShopInput;
};


export type MutationCreateStripeAccountArgs = {
  email: Scalars['String'];
};


export type MutationCreateUserArgs = {
  firebaseUserID: Scalars['String'];
};


export type MutationDeleProductArgs = {
  firebaseCompanyID: Scalars['String'];
  id: Scalars['ID'];
};


export type MutationDisactivateShopArgs = {
  id: Scalars['ID'];
};


export type MutationLikeArgs = {
  action: Scalars['String'];
  id: Scalars['ID'];
  to: Scalars['String'];
};


export type MutationNewFcmArgs = {
  FCM: Scalars['String'];
  firebaseUserID: Scalars['String'];
};


export type MutationPaymentIntentArgs = {
  firebaseUserID: Scalars['String'];
  shopID: Scalars['ID'];
};


export type MutationStripePaymentArgs = {
  productIDs: Array<Scalars['ID']>;
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID'];
  input: UpdateProductInput;
};


export type MutationUpdateShopArgs = {
  id: Scalars['ID'];
  input: UpdateShopInput;
};

export type Order = {
  __typename?: 'Order';
  cashbackAccumulated: Scalars['Float'];
  cashbackCompany: Scalars['Float'];
  cashbackUsed: Scalars['Float'];
  clientSecret?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  firebaseCompanyID: Scalars['String'];
  firebaseUserID: Scalars['String'];
  paymentType: Scalars['String'];
  pickUpHour: Scalars['Int'];
  products: Array<ProductOrder>;
  shopID: Scalars['ID'];
  shopName: Scalars['String'];
  status: Scalars['String'];
  timeStamp: Scalars['Int'];
  total: Scalars['Float'];
};

export type OrderInput = {
  pickUpHour: Scalars['String'];
  timeStamp: Scalars['String'];
};

export type PaymentIntent = {
  __typename?: 'PaymentIntent';
  accountID: Scalars['ID'];
  cashBack: Scalars['Float'];
  cbUsed: Scalars['Float'];
  clientSecret?: Maybe<Scalars['String']>;
  paymentIntentID: Scalars['ID'];
  products: Array<PaymentIntentProduct>;
  total: Scalars['Float'];
  type: Scalars['String'];
};

export type PaymentIntentProduct = {
  __typename?: 'PaymentIntentProduct';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Int'];
  weight: Scalars['Float'];
};

export type PaymentIntentProductInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Int'];
  weight: Scalars['Float'];
};

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID'];
  description: Scalars['String'];
  images: Array<Scalars['String']>;
  likes: Scalars['Int'];
  location: Location;
  name: Scalars['String'];
  price: Scalars['Float'];
  shop: Shop;
  shopID: Scalars['ID'];
  shopName: Scalars['String'];
  status: Scalars['String'];
  weight: Scalars['Float'];
};

export type ProductOrder = {
  __typename?: 'ProductOrder';
  _id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  productID: Scalars['ID'];
  quantity: Scalars['Int'];
  weight: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<StripeUser>;
  closeProductsTitle?: Maybe<Array<Maybe<Product>>>;
  closeShops?: Maybe<Array<LightShop>>;
  favouriteShops?: Maybe<Array<LightShop>>;
  login?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  products?: Maybe<Array<Product>>;
  shop?: Maybe<Shop>;
  shopByFirebaseID?: Maybe<Shop>;
  shops?: Maybe<Array<Shop>>;
  shopsByFirebaseCompanyID?: Maybe<Array<Shop>>;
};


export type QueryAccountArgs = {
  id: Scalars['ID'];
};


export type QueryCloseProductsTitleArgs = {
  limit: Scalars['Int'];
  location: LocationInput;
  name: Scalars['String'];
  offset: Scalars['Int'];
  range: Scalars['Int'];
};


export type QueryCloseShopsArgs = {
  cashBack?: InputMaybe<Scalars['Int']>;
  category?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  location: LocationInput;
  offset: Scalars['Int'];
  range: Scalars['Int'];
};


export type QueryFavouriteShopsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryLoginArgs = {
  firebaseToken: Scalars['String'];
  id: Scalars['ID'];
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryProductsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryShopArgs = {
  id: Scalars['ID'];
};


export type QueryShopByFirebaseIdArgs = {
  firebaseID: Scalars['String'];
};


export type QueryShopsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryShopsByFirebaseCompanyIdArgs = {
  firebaseCompanyID: Scalars['String'];
};

export type Shop = {
  __typename?: 'Shop';
  _id: Scalars['ID'];
  address: Scalars['String'];
  cashbackInfo: CashbackInfo;
  categories: Array<Scalars['String']>;
  email: Scalars['String'];
  favourites: Scalars['Int'];
  firebaseCompanyID: Scalars['String'];
  image: Scalars['String'];
  isActive: Scalars['Boolean'];
  likes: Scalars['Int'];
  location: Location;
  name: Scalars['String'];
  openDays: Scalars['String'];
  openHours: Scalars['String'];
  orderHours: Scalars['String'];
  phone: Scalars['String'];
  pickUpHours: Scalars['String'];
  products: Array<Product>;
};


export type ShopProductsArgs = {
  auth: Scalars['String'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type StripeUser = {
  __typename?: 'StripeUser';
  charges_enabled: Scalars['Boolean'];
  details_submitted: Scalars['Boolean'];
  id: Scalars['ID'];
  payouts_enabled: Scalars['Boolean'];
};

export type Subscription = {
  __typename?: 'Subscription';
  orderCreated: Order;
};

export type CashbackInfoInput = {
  cashBack: Scalars['Int'];
  fee: Scalars['Int'];
  minPayment: Scalars['Int'];
};

export type LocationInput = {
  coordinates: Array<InputMaybe<Scalars['Float']>>;
  type: Scalars['String'];
};

export type ProductInput = {
  description?: InputMaybe<Scalars['String']>;
  images: Array<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Float'];
  shopID: Scalars['ID'];
  shopName: Scalars['String'];
  weight: Scalars['Float'];
};

export type ShopInput = {
  address: Scalars['String'];
  cashbackInfo: CashbackInfoInput;
  categories: Array<Scalars['String']>;
  firebaseCompanyID: Scalars['ID'];
  image: Scalars['String'];
  isActive: Scalars['Boolean'];
  location: LocationInput;
  name: Scalars['String'];
  openDays: Scalars['String'];
  openHours: Scalars['String'];
  orderHours: Scalars['String'];
  phone: Scalars['String'];
  pickUpHours: Scalars['String'];
};

export type UpdateProductInput = {
  description?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  shopID?: InputMaybe<Scalars['ID']>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type UpdateShopInput = {
  address?: InputMaybe<Scalars['String']>;
  cashbackInfo?: InputMaybe<CashbackInfoInput>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  image?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  likes?: InputMaybe<Scalars['Int']>;
  location?: InputMaybe<LocationInput>;
  name?: InputMaybe<Scalars['String']>;
  openDays?: InputMaybe<Scalars['String']>;
  openHours?: InputMaybe<Scalars['String']>;
  orderHours?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  pickUpHours?: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CashbackInfo: ResolverTypeWrapper<CashbackInfo>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LightProduct: ResolverTypeWrapper<LightProduct>;
  LightShop: ResolverTypeWrapper<LightShop>;
  Location: ResolverTypeWrapper<Location>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  OrderInput: OrderInput;
  PaymentIntent: ResolverTypeWrapper<PaymentIntent>;
  PaymentIntentProduct: ResolverTypeWrapper<PaymentIntentProduct>;
  PaymentIntentProductInput: PaymentIntentProductInput;
  Product: ResolverTypeWrapper<Product>;
  ProductOrder: ResolverTypeWrapper<ProductOrder>;
  Query: ResolverTypeWrapper<{}>;
  Shop: ResolverTypeWrapper<Shop>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StripeUser: ResolverTypeWrapper<StripeUser>;
  Subscription: ResolverTypeWrapper<{}>;
  cashbackInfoInput: CashbackInfoInput;
  locationInput: LocationInput;
  productInput: ProductInput;
  shopInput: ShopInput;
  updateProductInput: UpdateProductInput;
  updateShopInput: UpdateShopInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CashbackInfo: CashbackInfo;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LightProduct: LightProduct;
  LightShop: LightShop;
  Location: Location;
  Mutation: {};
  Order: Order;
  OrderInput: OrderInput;
  PaymentIntent: PaymentIntent;
  PaymentIntentProduct: PaymentIntentProduct;
  PaymentIntentProductInput: PaymentIntentProductInput;
  Product: Product;
  ProductOrder: ProductOrder;
  Query: {};
  Shop: Shop;
  String: Scalars['String'];
  StripeUser: StripeUser;
  Subscription: {};
  cashbackInfoInput: CashbackInfoInput;
  locationInput: LocationInput;
  productInput: ProductInput;
  shopInput: ShopInput;
  updateProductInput: UpdateProductInput;
  updateShopInput: UpdateShopInput;
};

export type CashbackInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['CashbackInfo'] = ResolversParentTypes['CashbackInfo']> = {
  cashBack?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minPayment?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LightProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['LightProduct'] = ResolversParentTypes['LightProduct']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  productID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  shop?: Resolver<ResolversTypes['Shop'], ParentType, ContextType>;
  shopID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  shopName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LightShopResolvers<ContextType = any, ParentType extends ResolversParentTypes['LightShop'] = ResolversParentTypes['LightShop']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  cashbackInfo?: Resolver<ResolversTypes['CashbackInfo'], ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  likes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  openDays?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  openHours?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  coordinates?: Resolver<Array<Maybe<ResolversTypes['Float']>>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  accountLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationAccountLinkArgs, 'accountID'>>;
  activateShop?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationActivateShopArgs, 'id'>>;
  addToCart?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddToCartArgs, 'firebaseUserID' | 'productID' | 'quantity'>>;
  changeProductStatus?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationChangeProductStatusArgs, 'firebaseCompanyID' | 'id' | 'status'>>;
  createOrder?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateOrderArgs, 'options' | 'paymentIntentID'>>;
  createProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'firebaseCompanyID' | 'input'>>;
  createShop?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationCreateShopArgs, 'input'>>;
  createStripeAccount?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationCreateStripeAccountArgs, 'email'>>;
  createUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'firebaseUserID'>>;
  deleProduct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleProductArgs, 'firebaseCompanyID' | 'id'>>;
  disactivateShop?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDisactivateShopArgs, 'id'>>;
  like?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationLikeArgs, 'action' | 'id' | 'to'>>;
  newFCM?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationNewFcmArgs, 'FCM' | 'firebaseUserID'>>;
  paymentIntent?: Resolver<Maybe<ResolversTypes['PaymentIntent']>, ParentType, ContextType, RequireFields<MutationPaymentIntentArgs, 'firebaseUserID' | 'shopID'>>;
  stripePayment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationStripePaymentArgs, 'productIDs'>>;
  updateProduct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'id' | 'input'>>;
  updateShop?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateShopArgs, 'id' | 'input'>>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  cashbackAccumulated?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  cashbackCompany?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  cashbackUsed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  clientSecret?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firebaseCompanyID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firebaseUserID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pickUpHour?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['ProductOrder']>, ParentType, ContextType>;
  shopID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  shopName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timeStamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentIntentResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentIntent'] = ResolversParentTypes['PaymentIntent']> = {
  accountID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  cashBack?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  cbUsed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  clientSecret?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentIntentID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['PaymentIntentProduct']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentIntentProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentIntentProduct'] = ResolversParentTypes['PaymentIntentProduct']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  likes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  shop?: Resolver<ResolversTypes['Shop'], ParentType, ContextType>;
  shopID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  shopName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductOrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductOrder'] = ResolversParentTypes['ProductOrder']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  productID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  account?: Resolver<Maybe<ResolversTypes['StripeUser']>, ParentType, ContextType, RequireFields<QueryAccountArgs, 'id'>>;
  closeProductsTitle?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType, RequireFields<QueryCloseProductsTitleArgs, 'limit' | 'location' | 'name' | 'offset' | 'range'>>;
  closeShops?: Resolver<Maybe<Array<ResolversTypes['LightShop']>>, ParentType, ContextType, RequireFields<QueryCloseShopsArgs, 'limit' | 'location' | 'offset' | 'range'>>;
  favouriteShops?: Resolver<Maybe<Array<ResolversTypes['LightShop']>>, ParentType, ContextType, RequireFields<QueryFavouriteShopsArgs, 'ids'>>;
  login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'firebaseToken' | 'id'>>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType, RequireFields<QueryProductsArgs, 'ids'>>;
  shop?: Resolver<Maybe<ResolversTypes['Shop']>, ParentType, ContextType, RequireFields<QueryShopArgs, 'id'>>;
  shopByFirebaseID?: Resolver<Maybe<ResolversTypes['Shop']>, ParentType, ContextType, RequireFields<QueryShopByFirebaseIdArgs, 'firebaseID'>>;
  shops?: Resolver<Maybe<Array<ResolversTypes['Shop']>>, ParentType, ContextType, RequireFields<QueryShopsArgs, 'ids'>>;
  shopsByFirebaseCompanyID?: Resolver<Maybe<Array<ResolversTypes['Shop']>>, ParentType, ContextType, RequireFields<QueryShopsByFirebaseCompanyIdArgs, 'firebaseCompanyID'>>;
};

export type ShopResolvers<ContextType = any, ParentType extends ResolversParentTypes['Shop'] = ResolversParentTypes['Shop']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cashbackInfo?: Resolver<ResolversTypes['CashbackInfo'], ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  favourites?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  firebaseCompanyID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  likes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  openDays?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  openHours?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderHours?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pickUpHours?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<ShopProductsArgs, 'auth' | 'limit' | 'offset'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StripeUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['StripeUser'] = ResolversParentTypes['StripeUser']> = {
  charges_enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  details_submitted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  payouts_enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  orderCreated?: SubscriptionResolver<ResolversTypes['Order'], "orderCreated", ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CashbackInfo?: CashbackInfoResolvers<ContextType>;
  LightProduct?: LightProductResolvers<ContextType>;
  LightShop?: LightShopResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  PaymentIntent?: PaymentIntentResolvers<ContextType>;
  PaymentIntentProduct?: PaymentIntentProductResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductOrder?: ProductOrderResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Shop?: ShopResolvers<ContextType>;
  StripeUser?: StripeUserResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

