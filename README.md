<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>DINTORNI</h1>
<h3>◦ Navigate with Ease, Explore with Dintorni!</h3>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/Firebase-FFCA28.svg?style=plastic&logo=Firebase&logoColor=black" alt="Firebase" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=plastic&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/GraphQL-E10098.svg?style=plastic&logo=GraphQL&logoColor=white" alt="GraphQL" />
<img src="https://img.shields.io/badge/Redis-DC382D.svg?style=plastic&logo=Redis&logoColor=white" alt="Redis" />
<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=plastic&logo=YAML&logoColor=white" alt="YAML" />
<img src="https://img.shields.io/badge/Jest-C21325.svg?style=plastic&logo=Jest&logoColor=white" alt="Jest" />
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=plastic&logo=Nodemon&logoColor=white" alt="Nodemon" />
<img src="https://img.shields.io/badge/Progress-5CE500.svg?style=plastic&logo=Progress&logoColor=white" alt="Progress" />
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=plastic&logo=ESLint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/MongoDB-47A248.svg?style=plastic&logo=MongoDB&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/SemVer-3F4551.svg?style=plastic&logo=SemVer&logoColor=white" alt="SemVer" />

<img src="https://img.shields.io/badge/Lodash-3492FF.svg?style=plastic&logo=Lodash&logoColor=white" alt="Lodash" />
<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=plastic&logo=ts-node&logoColor=white" alt="tsnode" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=plastic&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=plastic&logo=Docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/Ajv-23C8D2.svg?style=plastic&logo=Ajv&logoColor=white" alt="Ajv" />
<img src="https://img.shields.io/badge/Buffer-231F20.svg?style=plastic&logo=Buffer&logoColor=white" alt="Buffer" />
<img src="https://img.shields.io/badge/Socket.io-010101.svg?style=plastic&logo=socketdotio&logoColor=white" alt="Socket.io" />
<img src="https://img.shields.io/badge/Stripe-008CDD.svg?style=plastic&logo=Stripe&logoColor=white" alt="Stripe" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style=plastic&logo=JSON&logoColor=white" alt="JSON" />
<img src="https://img.shields.io/badge/Express-000000.svg?style=plastic&logo=Express&logoColor=white" alt="Express" />
</p>
<img src="https://img.shields.io/github/license/tommaso-merlini/Dintorni?style=plastic&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/tommaso-merlini/Dintorni?style=plastic&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/tommaso-merlini/Dintorni?style=plastic&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/tommaso-merlini/Dintorni?style=plastic&color=5D6D7E" alt="GitHub top language" />
</div>

---

##  Table of Contents
- [ Table of Contents](#-table-of-contents)
- [ Overview](#-overview)
- [ Features](#-features)
- [ repository Structure](#-repository-structure)
- [ Modules](#modules)
- [ Getting Started](#-getting-started)
    - [ Installation](#-installation)
    - [ Running Dintorni](#-running-Dintorni)
    - [ Tests](#-tests)
- [ Roadmap](#-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---


##  Overview

Dintorni" is the next-gen online food shopping app.

---

##  Repository Structure

```sh
└── Dintorni/
    ├── .env_sample
    ├── Dockerfile
    ├── codegen.yml
    ├── docker-compose.yml
    ├── nginx/
    │   └── nginx.conf
    ├── package.json
    ├── redis/
    │   └── redis.conf
    ├── src/
    │   ├── @types/
    │   │   ├── bluebird.d.ts
    │   │   ├── express-rate-limit.d.ts
    │   │   ├── graphql-depth-limit.d.ts
    │   │   ├── graphql-fields.d.ts
    │   │   ├── graphql-kafka-subscriptions.d.ts
    │   │   ├── ioredis.d.ts
    │   │   ├── node-cron.d.ts
    │   │   └── redis.d.ts
    │   ├── GraphQL/
    │   │   ├── Functions/
    │   │   ├── MongoFilter/
    │   │   ├── Tests/
    │   │   ├── Types/
    │   │   ├── resolvers.ts
    │   │   └── typeDefs.ts
    │   ├── JWT/
    │   │   ├── AuthenticateToken.test.js
    │   │   └── AuthenticateToken.ts
    │   ├── Redis/
    │   │   ├── redis.ts
    │   │   ├── useDel/
    │   │   ├── useGet/
    │   │   └── useSet/
    │   ├── Schema/
    │   │   ├── Cart/
    │   │   ├── Company/
    │   │   ├── Likes/
    │   │   ├── Product/
    │   │   ├── Stripe/
    │   │   └── User/
    │   ├── Servers/
    │   │   ├── authServer.js
    │   │   └── server.ts
    │   ├── firebase/
    │   │   ├── checkAuth.js
    │   │   ├── fbServiceAccountKey.ts
    │   │   └── firebase.ts
    │   └── helpers/
    │       ├── canSee.ts
    │       ├── initMongoDB.ts
    │       └── initPubSub.ts
    ├── tsconfig.json
    └── yarn.lock

```

---


##  Modules

<details closed><summary>Root</summary>

| File                                                                                           | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---                                                                                            | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [yarn.lock](https://github.com/tommaso-merlini/Dintorni/blob/main/yarn.lock)                   | This code base represents a full stack application with GraphQL utilized for querying data. It includes type definitions and resolver functions for GraphQL, JWT for authentication, Redis for caching, Docker for creating a containerized development environment, and Nginx for reverse proxy setup. Custom types for external libraries are defined in'@types'. The'src' directory contains business logic, database schema, server initialization files, and Firebase for additional user authentication.                                                                                      |
| [.env_sample](https://github.com/tommaso-merlini/Dintorni/blob/main/.env_sample)               | The provided code represents a scalable application structure, including primary configurations and business logic. Core functionalities include interacting with MongoDB, Redis, and handling GraphQL queries through dedicated configurations and resolvers. It also manages user authentication using JWT, initiates Firebase services, and manages Stripe transactions. Application server-related and environment-specific settings are maintained in the '.env_sample' file. Docker support and Nginx configurations are included to control the deployment environment.                      |
| [docker-compose.yml](https://github.com/tommaso-merlini/Dintorni/blob/main/docker-compose.yml) | The code defines a Docker Compose configuration for a JavaScript application, with services for Redis and Nginx proxy. Redis, an in-memory data structure store, is for caching and the Nginx serving as a web-proxy. Each service is configured with specific Docker images and mounting volumes for configuration files. The node application service builds an environment from the current directory, linking it with Redis, and setting up environment variables from a.env file.                                                                                                              |
| [tsconfig.json](https://github.com/tommaso-merlini/Dintorni/blob/main/tsconfig.json)           | The code represents the configuration for a TypeScript project. The project targets ES6 and uses CommonJS module resolution. It also enables importing.json files, allows JavaScript files being part of the program, and supports CommonJS interoperability. The output files are directed into the "./dist" folder. It enforces consistent casing in file names and skips type checking for all.d.ts files.                                                                                                                                                                                       |
| [codegen.yml](https://github.com/tommaso-merlini/Dintorni/blob/main/codegen.yml)               | The given directory outline and'codegen.yml' file indicate a GraphQL-based project with Redis and Docker support. It's set to use MongoDB, Firebase authentication, JWT for token authentication, and Nginx as its web server. This project automates typescript type generation for GraphQL resolvers using'codegen.yml'. The'src' directory contains various functional aspects like GraphQL resolvers, schemas, servers, token authentication code and helper functions. It also supports rate-limiting and depth-limiting for GraphQL queries, and cron jobs.                                   |
| [package.json](https://github.com/tommaso-merlini/Dintorni/blob/main/package.json)             | The code represents the server-side directory structure and package manifest for a Node.js application. It supports GraphQL API with predefined schema, resolvers, and types; Firebase authentication; Redis database configurations; rate limiting; schedulers and subscription services. It includes Docker support for containerization, Nginx for web serving, and a JWT authentication service. Testing, code generation and server automation scripts are built into package.json. It manages dependencies for packages like Apollo Server, Firebase, Mongoose, ioredis, Express, and others. |
| [Dockerfile](https://github.com/tommaso-merlini/Dintorni/blob/main/Dockerfile)                 | HTTPStatus Exception: 429                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

</details>

<details closed><summary>Redis</summary>

| File                                                                                 | Summary                   |
| ---                                                                                  | ---                       |
| [redis.conf](https://github.com/tommaso-merlini/Dintorni/blob/main/redis/redis.conf) | HTTPStatus Exception: 429 |
| [redis.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/Redis/redis.ts) | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Nginx</summary>

| File                                                                                 | Summary                   |
| ---                                                                                  | ---                       |
| [nginx.conf](https://github.com/tommaso-merlini/Dintorni/blob/main/nginx/nginx.conf) | HTTPStatus Exception: 429 |

</details>

<details closed><summary>@types</summary>

| File                                                                                                                                  | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---                                                                                                                                   | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [node-cron.d.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/@types/node-cron.d.ts)                                     | HTTPStatus Exception: 429                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [graphql-fields.d.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/@types/graphql-fields.d.ts)                           | HTTPStatus Exception: 429                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [express-rate-limit.d.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/@types/express-rate-limit.d.ts)                   | HTTPStatus Exception: 429                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [graphql-depth-limit.d.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/@types/graphql-depth-limit.d.ts)                 | HTTPStatus Exception: 429                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [bluebird.d.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/@types/bluebird.d.ts)                                       | The given code structure reflects a project utilizing Docker, GraphQL, JWTs, Redis, and various helper tools. Docker-related files facilitate containerization. JWT and GraphQL directories manage authentication and data querying respectively. The Redis directory handles caching, emphasizing data manipulation. Helpers initiate MongoDB and a PubSub service. The specific source file (src/@types/bluebird.d.ts) is typescript declaration file for the Bluebird promise library. |
| [ioredis.d.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/@types/ioredis.d.ts)                                         | HTTPStatus Exception: 429                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [redis.d.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/@types/redis.d.ts)                                             | HTTPStatus Exception: 429                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [graphql-kafka-subscriptions.d.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/@types/graphql-kafka-subscriptions.d.ts) | HTTPStatus Exception: 429                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

</details>

<details closed><summary>Servers</summary>

| File                                                                                             | Summary                   |
| ---                                                                                              | ---                       |
| [authServer.js](https://github.com/tommaso-merlini/Dintorni/blob/main/src/Servers/authServer.js) | HTTPStatus Exception: 429 |
| [server.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/Servers/server.ts)         | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Useget</summary>

| File                                                                                          | Summary                   |
| ---                                                                                           | ---                       |
| [useGet.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/Redis/useGet/useGet.ts) | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Useset</summary>

| File                                                                                          | Summary                   |
| ---                                                                                           | ---                       |
| [useSet.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/Redis/useSet/useSet.ts) | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Usedel</summary>

| File                                                                                          | Summary                   |
| ---                                                                                           | ---                       |
| [useDel.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/Redis/useDel/useDel.ts) | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Helpers</summary>

| File                                                                                               | Summary                   |
| ---                                                                                                | ---                       |
| [canSee.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/helpers/canSee.ts)           | HTTPStatus Exception: 429 |
| [initMongoDB.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/helpers/initMongoDB.ts) | HTTPStatus Exception: 429 |
| [initPubSub.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/helpers/initPubSub.ts)   | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Company</summary>

| File                                                                                                                                                   | Summary                   |
| ---                                                                                                                                                    | ---                       |
| [Company.model.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/Schema/Company/Company.model.ts)                                          | HTTPStatus Exception: 429 |
| [shopByFirebaseID.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Queries/Company/shopByFirebaseID.ts)                 | HTTPStatus Exception: 429 |
| [closeShops.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Queries/Company/closeShops.ts)                             | HTTPStatus Exception: 429 |
| [shop.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Queries/Company/shop.ts)                                         | HTTPStatus Exception: 429 |
| [favouriteShops.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Queries/Company/favouriteShops.ts)                     | HTTPStatus Exception: 429 |
| [shops.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Queries/Company/shops.ts)                                       | HTTPStatus Exception: 429 |
| [shopsByFirebaseCompanyID.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Queries/Company/shopsByFirebaseCompanyID.ts) | HTTPStatus Exception: 429 |
| [productsShop.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Queries/Company/productsShop.ts)                         | HTTPStatus Exception: 429 |
| [updateShop.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/Company/updateShop.ts)                           | HTTPStatus Exception: 429 |
| [disactivateShop.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/Company/disactivateShop.ts)                 | HTTPStatus Exception: 429 |
| [activateShop.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/Company/activateShop.ts)                       | HTTPStatus Exception: 429 |
| [createShop.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/Company/createShop.ts)                           | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Shop</summary>

| File                                                                                                         | Summary                   |
| ---                                                                                                          | ---                       |
| [Shop.model.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/Schema/Company/Shop/Shop.model.ts) | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Likes</summary>

| File                                                                                                                  | Summary                   |
| ---                                                                                                                   | ---                       |
| [ProductLike.module.js](https://github.com/tommaso-merlini/Dintorni/blob/main/src/Schema/Likes/ProductLike.module.js) | HTTPStatus Exception: 429 |
| [CompanyLike.module.js](https://github.com/tommaso-merlini/Dintorni/blob/main/src/Schema/Likes/CompanyLike.module.js) | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Cart</summary>

| File                                                                                                                    | Summary                   |
| ---                                                                                                                     | ---                       |
| [Cart.model.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/Schema/Cart/Cart.model.ts)                    | HTTPStatus Exception: 429 |
| [addToCart.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/Cart/addToCart.ts) | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Product</summary>

| File                                                                                                                                           | Summary                   |
| ---                                                                                                                                            | ---                       |
| [Product.model.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/Schema/Product/Product.model.ts)                                  | HTTPStatus Exception: 429 |
| [closeProductsTitle.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Queries/Product/closeProductsTitle.ts)     | HTTPStatus Exception: 429 |
| [product.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Queries/Product/product.ts)                           | HTTPStatus Exception: 429 |
| [products.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Queries/Product/products.ts)                         | HTTPStatus Exception: 429 |
| [shopProduct.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Queries/Product/shopProduct.ts)                   | HTTPStatus Exception: 429 |
| [deleteProduct.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/Product/deleteProduct.ts)             | HTTPStatus Exception: 429 |
| [createProduct.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/Product/createProduct.ts)             | HTTPStatus Exception: 429 |
| [changeProductStatus.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/Product/changeProductStatus.ts) | HTTPStatus Exception: 429 |
| [updateProduct.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/Product/updateProduct.ts)             | HTTPStatus Exception: 429 |

</details>

<details closed><summary>User</summary>

| File                                                                                                                      | Summary                   |
| ---                                                                                                                       | ---                       |
| [User.model.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/Schema/User/User.model.ts)                      | HTTPStatus Exception: 429 |
| [user.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Queries/User/user.ts)               | HTTPStatus Exception: 429 |
| [FCM.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/User/FCM.ts)               | HTTPStatus Exception: 429 |
| [updateUser.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/User/updateUser.ts) | HTTPStatus Exception: 429 |
| [CreateUser.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/User/CreateUser.ts) | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Stripe</summary>

| File                                                                                                                                          | Summary                   |
| ---                                                                                                                                           | ---                       |
| [PaymentIntent.model.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/Schema/Stripe/PaymentIntent.model.ts)                      | HTTPStatus Exception: 429 |
| [account.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Queries/Stripe/account.ts)                           | HTTPStatus Exception: 429 |
| [paymentIntent.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/Stripe/paymentIntent.ts)             | HTTPStatus Exception: 429 |
| [stripePayment.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/Stripe/stripePayment.ts)             | HTTPStatus Exception: 429 |
| [createStripeAccount.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/Stripe/createStripeAccount.ts) | HTTPStatus Exception: 429 |
| [createOrder.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/Stripe/createOrder.ts)                 | HTTPStatus Exception: 429 |
| [accountLink.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/Stripe/accountLink.ts)                 | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Firebase</summary>

| File                                                                                                                | Summary                   |
| ---                                                                                                                 | ---                       |
| [fbServiceAccountKey.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/firebase/fbServiceAccountKey.ts) | HTTPStatus Exception: 429 |
| [firebase.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/firebase/firebase.ts)                       | HTTPStatus Exception: 429 |
| [checkAuth.js](https://github.com/tommaso-merlini/Dintorni/blob/main/src/firebase/checkAuth.js)                     | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Graphql</summary>

| File                                                                                           | Summary                   |
| ---                                                                                            | ---                       |
| [typeDefs.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/typeDefs.ts)   | HTTPStatus Exception: 429 |
| [resolvers.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/resolvers.ts) | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Mongofilter</summary>

| File                                                                                                           | Summary                   |
| ---                                                                                                            | ---                       |
| [MongoFilter.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/MongoFilter/MongoFilter.ts) | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Types</summary>

| File                                                                                         | Summary                   |
| ---                                                                                          | ---                       |
| [types.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Types/types.ts) | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Tests</summary>

| File                                                                                                           | Summary                   |
| ---                                                                                                            | ---                       |
| [resolvers.test.js](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Tests/resolvers.test.js) | HTTPStatus Exception: 429 |
| [init.js](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Tests/init.js)                     | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Actions</summary>

| File                                                                                                             | Summary                   |
| ---                                                                                                              | ---                       |
| [like.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/GraphQL/Functions/Mutations/Actions/like.ts) | HTTPStatus Exception: 429 |

</details>

<details closed><summary>Jwt</summary>

| File                                                                                                                 | Summary                   |
| ---                                                                                                                  | ---                       |
| [AuthenticateToken.test.js](https://github.com/tommaso-merlini/Dintorni/blob/main/src/JWT/AuthenticateToken.test.js) | HTTPStatus Exception: 429 |
| [AuthenticateToken.ts](https://github.com/tommaso-merlini/Dintorni/blob/main/src/JWT/AuthenticateToken.ts)           | HTTPStatus Exception: 429 |

</details>

---

##  Getting Started

***Dependencies***

Please ensure you have the following dependencies installed on your system:

`- ℹ️ Dependency 1`

`- ℹ️ Dependency 2`

`- ℹ️ ...`

###  Installation

1. Clone the Dintorni repository:
```sh
git clone https://github.com/tommaso-merlini/Dintorni.git
```

2. Change to the project directory:
```sh
cd Dintorni
```

3. Install the dependencies:
```sh
npm install
```

###  Running Dintorni

```sh
npm run build && node dist/main.js
```

###  Tests
```sh
npm test
```

---


##  Project Roadmap

> - [X] `ℹ️  Task 1: Implement X`
> - [ ] `ℹ️  Task 2: Implement Y`
> - [ ] `ℹ️ ...`


---

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/tommaso-merlini/Dintorni/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/tommaso-merlini/Dintorni/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/tommaso-merlini/Dintorni/issues)**: Submit bugs found or log feature requests for TOMMASO-MERLINI.

#### *Contributing Guidelines*

<details closed>
<summary>Click to expand</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone <your-forked-repo-url>
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

##  License


This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#Top)

---
