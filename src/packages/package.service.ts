import { createEventsPackage } from "./events";
import { createHttpPackage } from "./http";
import { createI18nPackage } from "./i18n";
import { createInjectPackage } from "./inject";
import { ConfigNames } from "../config/config.type";
import { createBusinessLogicPackage } from "./business-logic";
import { Package } from "./package";
import { createValidatePackage } from "./validate";
import { createWebsocketPackage } from "./websocket";

export const packages: Map<ConfigNames, Package> = new Map();
packages.set(ConfigNames.businessLogic, createBusinessLogicPackage());
packages.set(ConfigNames.events, createEventsPackage());
packages.set(ConfigNames.http, createHttpPackage());
packages.set(ConfigNames.i18n, createI18nPackage());
packages.set(ConfigNames.inject, createInjectPackage());
packages.set(ConfigNames.validate, createValidatePackage());
packages.set(ConfigNames.websocket, createWebsocketPackage());
