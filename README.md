# E-Mail Service 📧 

[![main](https://github.com/PHT-Medic/email-service/actions/workflows/main.yml/badge.svg)](https://github.com/PHT-Medic/email-service/actions/workflows/main.yml)
[![Build image](https://github.com/PHT-Medic/email-service/actions/workflows/build.yml/badge.svg)](https://github.com/PHT-Medic/email-service/actions/workflows/build.yml)

This repository contains the station ui application of the Personal Health Train.

**Table of Contents**

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
    - [Production](#production)
    - [Development](#development)

## Installation

```shell
git clone https://github.com/PHT-Medic/email-service
cd email-service
npm install
```

## Configuration
The following settings need to be added to the environment file `.env` in the root directory.
```
NODE_ENV=development
API_URL=<url>
WEB_URL=<url>
VAULT_CONNECTION_STRING=<password>@<url>/v1/

```

## Usage

### Production

``` bash
# build application for production 🛠
npm run build

# run application ⚔
npm run start
```

### Development

``` bash
# serve application on the fly 🔥
npm run dev
````
