install:
	cd application && npm ci
	cd server && npm ci

build:
	cd application && npm run build