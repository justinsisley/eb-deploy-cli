<p align="center">
  <img alt="eb-deploy-cli" src="https://image.flaticon.com/icons/svg/884/884309.svg" width="80">
</p>

<h3 align="center">
  eb-deploy-cli
</h3>

<p align="center">
  A very simple AWS Elastic Beanstalk deployment CLI
</p>

<p align="center">
  <img src="https://img.shields.io/github/release/justinsisley/eb-deploy-cli.svg?style=for-the-badge" alt="GitHub release" /> <img src="https://img.shields.io/github/license/justinsisley/eb-deploy-cli.svg?style=for-the-badge" alt="license" />
</p>

---

__eb-deploy-cli__ is a command line utility for [Node.js](https://nodejs.org/) that helps you helps you upload and deploy new application versions for [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) applications.

Because this CLI requires AWS credentials, it is highly recommended that you [view the source code](https://github.com/justinsisley/eb-deploy-cli/blob/master/index.js) to ensure that your tokens are safe and sound.

---

# Table of Contents

- [Features](#features)
- [Documentation](#documentation)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
    - [Linting](#linting)
- [Releases](https://github.com/justinsisley/eb-deploy-cli/blob/master/CHANGELOG.md)
- [Credits](#credits)

# Features

- __Focused CLI for uploading and deploying to Elastic Beanstalk__
- __Absurdly simple deployments in your CI pipeline__
- __Easy-to-read source code you can trust__
- __Runs on Node.js v8+__

# Documentation

## Installation

Install as a _devDependency_:

```bash
npm install -D eb-deploy-cli
```

## Usage

Run the command:

```bash
./node_modules/.bin/eb-deploy \
  --source="./my-app.zip" \
  --label="v1.0.0" \
  --accessKeyId="XXXXXXXXXX" \
  --secretAccessKey="XXXXXXXXXX" \
  --region="us-east-1" \
  --bucket="my-s3-bucket" \
  --applicationName="my-app" \
  --environmentName="staging"
```

For continuous integration environments, you'll probably want to use environment variables for parts of your configuration. This might look something like:

```bash
# Read the version from package.json
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

# Deploy the new version
./node_modules/.bin/eb-deploy \
  --source="./my-app.zip" \
  --label="v$PACKAGE_VERSION" \
  --accessKeyId="$AWS_ACCESS_KEY_ID" \
  --secretAccessKey="$AWS_SECRET_ACCESS_KEY" \
  --region="us-east-1" \
  --bucket="my-s3-bucket" \
  --applicationName="my-app" \
  --environmentName="staging"
```

> __Note:__ There are no default values for any arguments.

# Contributing

## Linting

Run ESLint with `npm run lint`.

# Credits
<div>Icon made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
