"use strict";
(self["webpackChunkjupyterlab_pachyderm"] = self["webpackChunkjupyterlab_pachyderm"] || []).push([["lib_index_js-webpack_sharing_consume_default_lumino_coreutils"],{

/***/ "./lib/handler.js":
/*!************************!*\
  !*** ./lib/handler.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "requestAPI": () => (/* binding */ requestAPI)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function requestAPI(endPoint = '', method = 'GET', body = null, namespace = 'pachyderm/v2') {
    return __awaiter(this, void 0, void 0, function* () {
        // Make request to Jupyter API
        const settings = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeSettings();
        const requestUrl = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(settings.baseUrl, namespace, // API Namespace
        endPoint);
        const init = {
            method,
            body: body ? JSON.stringify(body) : undefined,
        };
        let response;
        try {
            response = yield _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeRequest(requestUrl, init, settings);
        }
        catch (error) {
            throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.NetworkError(error);
        }
        let data = yield response.text();
        if (data.length > 0) {
            try {
                data = JSON.parse(data);
            }
            catch (error) {
                console.log('Not a JSON response body.', response);
            }
        }
        if (!response.ok) {
            const { message, traceback } = data;
            throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.ResponseError(response, message || `Invalid response: ${response.status} ${response.statusText}`, traceback || '');
        }
        return data;
    });
}


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _plugins_telemetry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugins/telemetry */ "./lib/plugins/telemetry/index.js");
/* harmony import */ var _plugins_help__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plugins/help */ "./lib/plugins/help/index.js");
/* harmony import */ var _plugins_examples__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugins/examples */ "./lib/plugins/examples/index.js");
/* harmony import */ var _plugins_mount__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plugins/mount */ "./lib/plugins/mount/index.js");




/**
 * Export the plugins as default.
 */
const plugins = [
    _plugins_mount__WEBPACK_IMPORTED_MODULE_0__["default"],
    _plugins_telemetry__WEBPACK_IMPORTED_MODULE_1__["default"],
    _plugins_help__WEBPACK_IMPORTED_MODULE_2__["default"],
    _plugins_examples__WEBPACK_IMPORTED_MODULE_3__["default"],
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);


/***/ }),

/***/ "./lib/plugins/examples/examples.js":
/*!******************************************!*\
  !*** ./lib/plugins/examples/examples.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/icons */ "./lib/utils/icons.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const EXAMPLES_CATAGORY = 'Pachyderm Examples';
const examples = [
    {
        path: 'examples/Intro to Pachyderm Tutorial.ipynb',
        title: 'Intro to Pachyderm',
        command: 'jupyterlab-pachyderm:open-example-intro',
        rank: 1,
    },
    {
        path: 'examples/Mounting Data Repos in Notebooks.ipynb',
        title: 'Mounting Data Repos',
        command: 'jupyterlab-pachyderm:open-example-mount',
        rank: 2,
    },
];
const doesPathExist = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const settings = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeSettings();
        const response = yield fetch(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(settings.baseUrl, 'api/contents', path));
        return response.status === 200;
    }
    catch (_a) {
        return false;
    }
});
const addExample = (example, app, launcher) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield doesPathExist(example.path)) {
        app.commands.addCommand(example.command, {
            icon: _utils_icons__WEBPACK_IMPORTED_MODULE_2__.fileIcon,
            label: example.title,
            execute: () => {
                return app.commands.execute('docmanager:open', {
                    path: example.path,
                });
            },
        });
        launcher.add({
            command: example.command,
            category: EXAMPLES_CATAGORY,
            rank: example.rank,
        });
    }
});
const init = (app, launcher) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(examples.map((example) => {
        return addExample(example, app, launcher);
    }));
});


/***/ }),

/***/ "./lib/plugins/examples/index.js":
/*!***************************************!*\
  !*** ./lib/plugins/examples/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/launcher */ "webpack/sharing/consume/default/@jupyterlab/launcher");
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _examples__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./examples */ "./lib/plugins/examples/examples.js");


const help = {
    id: 'jupyterlab-pachyderm:examples',
    autoStart: true,
    requires: [_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_0__.ILauncher],
    activate: (app, launcher) => {
        return (0,_examples__WEBPACK_IMPORTED_MODULE_1__.init)(app, launcher);
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (help);


/***/ }),

/***/ "./lib/plugins/help/help.js":
/*!**********************************!*\
  !*** ./lib/plugins/help/help.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_components_Svgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/components/Svgs */ "./lib/utils/components/Svgs/PachydermLogo.js");



var CommandIDs;
(function (CommandIDs) {
    CommandIDs.openDocs = 'jupyterlab-pachyderm:open-docs';
    CommandIDs.contactSupport = 'jupyterlab-pachyderm:contact-support';
})(CommandIDs || (CommandIDs = {}));
const init = (app, mainMenu) => {
    if (mainMenu) {
        app.commands.addCommand(CommandIDs.openDocs, {
            label: 'Pachyderm Docs',
            execute: () => {
                window.open('https://docs.pachyderm.com/latest/getting_started/');
            },
        });
        app.commands.addCommand(CommandIDs.contactSupport, {
            label: 'Contact Pachyderm Support',
            execute: () => {
                const title = (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-help-title" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_utils_components_Svgs__WEBPACK_IMPORTED_MODULE_2__["default"], { className: "pachyderm-help-title-logo" }),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "Pachyderm Support")));
                const body = (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-help-body" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null,
                        "Chat with us on",
                        ' ',
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: "https://slack.pachyderm.io", className: "pachyderm-help-link" }, "Slack")),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null,
                        "Email us at",
                        ' ',
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: "mailto:support@pachyderm.com", className: "pachyderm-help-link" }, "support@pachyderm.com"))));
                return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                    title,
                    body,
                    buttons: [
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.createButton({
                            label: 'Dismiss',
                            className: 'jp-About-button jp-mod-reject jp-mod-styled',
                        }),
                    ],
                });
            },
        });
        const helpMenu = mainMenu.helpMenu;
        helpMenu.addGroup([
            {
                command: CommandIDs.openDocs,
            },
            {
                command: CommandIDs.contactSupport,
            },
        ], 20);
    }
};


/***/ }),

/***/ "./lib/plugins/help/index.js":
/*!***********************************!*\
  !*** ./lib/plugins/help/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _help__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./help */ "./lib/plugins/help/help.js");


const help = {
    id: 'jupyterlab-pachyderm:help',
    autoStart: true,
    requires: [_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_0__.IMainMenu],
    activate: (app, mainMenu) => {
        (0,_help__WEBPACK_IMPORTED_MODULE_1__.init)(app, mainMenu);
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (help);


/***/ }),

/***/ "./lib/plugins/mount/components/Config/Config.js":
/*!*******************************************************!*\
  !*** ./lib/plugins/mount/components/Config/Config.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hooks/useConfig */ "./lib/plugins/mount/components/Config/hooks/useConfig.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/icons */ "./lib/utils/icons.js");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_components_LoadingDots_LoadingDots__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../utils/components/LoadingDots/LoadingDots */ "./lib/utils/components/LoadingDots/LoadingDots.js");
/* harmony import */ var _utils_components_Svgs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../utils/components/Svgs */ "./lib/utils/components/Svgs/KubernetesElephant.js");






const Config = ({ showConfig, setShowConfig, reposStatus, updateConfig, authConfig, refresh, }) => {
    const { addressField, setAddressField, errorMessage, setErrorMessage, shouldShowAddressInput, setShouldShowAddressInput, updatePachdAddress, callLogin, callLogout, shouldShowLogin, loading, showAdvancedOptions, setShowAdvancedOptions, serverCa, setServerCa, } = (0,_hooks_useConfig__WEBPACK_IMPORTED_MODULE_2__.useConfig)(showConfig, setShowConfig, updateConfig, authConfig, refresh, reposStatus);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-config-form-base" },
            reposStatus === 200 && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-config-back" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { "data-testid": "Config__back", className: "pachyderm-button-link", onClick: () => setShowConfig(false) },
                    "Back",
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.closeIcon.react, { tag: "span", className: "pachyderm-mount-icon-padding" })))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-config-heading" },
                "Pachyderm",
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "pachyderm-mount-config-subheading" }, "Mount Extension")),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-config-address-wrapper" }, authConfig.pachd_address && !shouldShowAddressInput ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", { htmlFor: "pachd", className: "pachyderm-mount-config-address-label" }, "Cluster Address"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { "data-testid": "Config__pachdAddress", className: "pachyderm-mount-config-address" }, authConfig.pachd_address),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { "data-testid": "Config__pachdAddressUpdate", className: "pachyderm-button-link", onClick: () => setShouldShowAddressInput(true) }, "Change Address"))) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: {
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: {
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                    } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "pachyderm-mount-config-subheading" }, authConfig.pachd_address
                        ? 'Update Configuration'
                        : 'Connect To a Cluster'),
                    authConfig.pachd_address && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { "data-testid": "Config__pachdAddressCancel", className: "pachyderm-button-link", disabled: loading, onClick: () => {
                            setErrorMessage('');
                            setAddressField('');
                            setServerCa('');
                            setShouldShowAddressInput(false);
                            setShowAdvancedOptions(false);
                        } },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.closeIcon.react, { tag: "span" })))),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", { htmlFor: "pachd", className: "pachyderm-mount-config-address-label" }, "Cluster Address"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { className: "pachyderm-input", "data-testid": "Config__pachdAddressInput", name: "pachd", value: addressField, onInput: (e) => {
                        if (errorMessage) {
                            setErrorMessage('');
                        }
                        setAddressField(e.target.value);
                    }, disabled: loading, placeholder: "grpcs://example.pachyderm.com:30650" }),
                showAdvancedOptions && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-config-advanced-settings" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", { htmlFor: "pachd", className: "pachyderm-mount-config-address-label", style: { display: 'flex' } },
                        "Server CAs",
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-list-item-status-icon", title: "Optional, include if you manage your own certificates." },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_utils_icons__WEBPACK_IMPORTED_MODULE_3__.infoIcon.react, { tag: "span" }))),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", { "data-testid": "Config__serverCaInput", style: { maxHeight: '200px' }, className: "pachyderm-input", value: serverCa, onChange: (e) => {
                            setServerCa(e.target.value);
                        }, disabled: loading }))),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { paddingTop: '1rem' } },
                    loading && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-list-item-status-icon", style: { position: 'static' } },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_utils_components_LoadingDots_LoadingDots__WEBPACK_IMPORTED_MODULE_4__["default"], null))),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "pachyderm-mount-config-address-error" }, errorMessage)),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-config-advanced-settings-button" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { "data-testid": "Config__advancedSettingsToggle", className: "pachyderm-button-link", onClick: () => {
                            if (showAdvancedOptions) {
                                setServerCa('');
                            }
                            setShowAdvancedOptions(!showAdvancedOptions);
                        }, disabled: loading }, showAdvancedOptions
                        ? 'Clear Advanced Settings'
                        : 'Use Advanced Settings'),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { "data-testid": "Config__pachdAddressSubmit", className: "pachyderm-button pachyderm-mount-config-set-address", style: { width: '100px' }, disabled: loading || !addressField, onClick: updatePachdAddress }, "Set Address"))))),
            shouldShowLogin && !shouldShowAddressInput && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-login-container" }, reposStatus === 200 ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { "data-testid": "Config__logout", className: "pachyderm-button", style: { width: '100px' }, disabled: loading, onClick: callLogout }, "Logout")) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { "data-testid": "Config__login", className: "pachyderm-button", style: { width: '100px' }, disabled: loading, onClick: callLogin }, "Login"))))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-config-graphic-base" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-config-graphic-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_utils_components_Svgs__WEBPACK_IMPORTED_MODULE_5__["default"], { width: "230px", height: "230px" })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Config);


/***/ }),

/***/ "./lib/plugins/mount/components/Config/hooks/useConfig.js":
/*!****************************************************************!*\
  !*** ./lib/plugins/mount/components/Config/hooks/useConfig.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useConfig": () => (/* binding */ useConfig)
/* harmony export */ });
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../handler */ "./lib/handler.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_hooks_usePreviousValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../utils/hooks/usePreviousValue */ "./lib/utils/hooks/usePreviousValue.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const useConfig = (showConfig, setShowConfig, updateConfig, authConfig, refresh, reposStatus) => {
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [addressField, setAddressField] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [errorMessage, setErrorMessage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [shouldShowLogin, setShouldShowLogin] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [shouldShowAddressInput, setShouldShowAddressInput] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [showAdvancedOptions, setShowAdvancedOptions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [serverCa, setServerCa] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (showConfig) {
            setShouldShowLogin(authConfig.cluster_status === 'AUTH_ENABLED');
            setShouldShowAddressInput(authConfig.cluster_status === 'INVALID');
        }
        setErrorMessage('');
        setAddressField('');
        setServerCa('');
        setShowAdvancedOptions(false);
    }, [showConfig, authConfig]);
    const previousStatus = (0,_utils_hooks_usePreviousValue__WEBPACK_IMPORTED_MODULE_1__["default"])(reposStatus);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (showConfig &&
            previousStatus &&
            previousStatus !== 200 &&
            reposStatus === 200) {
            setShowConfig(false);
        }
    }, [showConfig, reposStatus]);
    const updatePachdAddress = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            const tmpAddress = addressField.trim();
            const validAddressPattern = /^((grpc|grpcs|http|https|unix):\/\/)/;
            if (validAddressPattern.test(tmpAddress)) {
                const response = yield (0,_handler__WEBPACK_IMPORTED_MODULE_2__.requestAPI)('config', 'PUT', serverCa
                    ? {
                        pachd_address: tmpAddress,
                        server_cas: serverCa,
                    }
                    : { pachd_address: tmpAddress });
                if (response.cluster_status === 'INVALID') {
                    setErrorMessage('Invalid address.');
                }
                else {
                    updateConfig(response);
                    setShouldShowLogin(response.cluster_status === 'AUTH_ENABLED');
                }
            }
            else {
                setErrorMessage('Cluster address should start with grpc://, grpcs://, http://, https:// or unix://');
            }
        }
        catch (e) {
            setErrorMessage('Unable to connect to cluster.');
            console.log(e);
        }
        setLoading(false);
    });
    const callLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            const res = yield (0,_handler__WEBPACK_IMPORTED_MODULE_2__.requestAPI)('auth/_login', 'PUT');
            if (res.auth_url) {
                const x = window.screenX + (window.outerWidth - 500) / 2;
                const y = window.screenY + (window.outerHeight - 500) / 2.5;
                const features = `width=${500},height=${500},left=${x},top=${y}`;
                window.open(res.auth_url, '', features);
            }
        }
        catch (e) {
            console.log(e);
        }
        // There is no current way to get infromation from the auth_url window.
        // Adding a timeout to prevent users from spamming the button.
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    });
    const callLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            yield (0,_handler__WEBPACK_IMPORTED_MODULE_2__.requestAPI)('auth/_logout', 'PUT');
            yield refresh();
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
    });
    return {
        addressField,
        setAddressField,
        errorMessage,
        setErrorMessage,
        shouldShowAddressInput,
        setShouldShowAddressInput,
        updatePachdAddress,
        callLogin,
        callLogout,
        shouldShowLogin,
        loading,
        showAdvancedOptions,
        setShowAdvancedOptions,
        serverCa,
        setServerCa,
    };
};


/***/ }),

/***/ "./lib/plugins/mount/components/Datum/Datum.js":
/*!*****************************************************!*\
  !*** ./lib/plugins/mount/components/Datum/Datum.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useDatum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hooks/useDatum */ "./lib/plugins/mount/components/Datum/hooks/useDatum.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const placeholderText = `{
  "pfs": {
    "repo": "images",
    "branch": "dev",
    "glob": "/*",
  }
}`;
const Datum = ({ showDatum, setShowDatum, keepMounted, setKeepMounted, currentDatumInfo, refresh, pollRefresh, }) => {
    const { loading, shouldShowCycler, currentDatumId, currentDatumIdx, setCurrentDatumIdx, numDatums, inputSpec, setInputSpec, callMountDatums, callUnmountAll, errorMessage, setDebug, } = (0,_hooks_useDatum__WEBPACK_IMPORTED_MODULE_2__.useDatum)(showDatum, keepMounted, refresh, pollRefresh, currentDatumInfo);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-datum-base" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-datum-back" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { "data-testid": "Datum__back", className: "pachyderm-button-link", onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                    yield callUnmountAll();
                    setKeepMounted(false);
                    setShowDatum(false);
                }) },
                "Back",
                ' ',
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.closeIcon.react, { tag: "span", className: "pachyderm-mount-icon-padding" }))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "pachyderm-mount-datum-subheading" }, "Test Datums"),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-datum-input-wrapper" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", { className: "pachyderm-mount-datum-label", htmlFor: "inputSpec" }, "Input spec"),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", { className: "pachyderm-input", "data-testid": "Datum__inputSpecInput", style: { minHeight: '200px' }, name: "inputSpec", value: inputSpec, onChange: (e) => {
                    setDebug('========>>>> value is ' + e.target.value);
                    setInputSpec(e.target.value);
                }, disabled: loading, placeholder: placeholderText }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "pachyderm-mount-datum-error" }, errorMessage),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { "data-testid": "Datum__mountDatums", className: "pachyderm-button-link", onClick: callMountDatums, style: { padding: '0.5rem' } }, "Mount Datums"),
            shouldShowCycler && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-datum-cycler" },
                "Datum",
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { display: 'flex' } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "pachyderm-button-link", "data-testid": "Datum__cyclerLeft", disabled: currentDatumIdx <= 0, onClick: () => {
                            if (currentDatumIdx >= 1) {
                                setCurrentDatumIdx(currentDatumIdx - 1);
                            }
                        } },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.caretLeftIcon.react, { tag: "span", className: "pachyderm-mount-datum-left" })),
                    '(' + (currentDatumIdx + 1) + '/' + numDatums + ')',
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "pachyderm-button-link", "data-testid": "Datum__cyclerRight", disabled: currentDatumIdx >= numDatums - 1, onClick: () => {
                            if (currentDatumIdx < numDatums - 1) {
                                setCurrentDatumIdx(currentDatumIdx + 1);
                            }
                        } },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.caretRightIcon.react, { tag: "span", className: "pachyderm-mount-datum-right" }))))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Datum);


/***/ }),

/***/ "./lib/plugins/mount/components/Datum/hooks/useDatum.js":
/*!**************************************************************!*\
  !*** ./lib/plugins/mount/components/Datum/hooks/useDatum.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useDatum": () => (/* binding */ useDatum)
/* harmony export */ });
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../handler */ "./lib/handler.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const useDatum = (showDatum, keepMounted, refresh, pollRefresh, currentDatumInfo) => {
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [shouldShowCycler, setShouldShowCycler] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [currentDatumId, setCurrentDatumId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [currentDatumIdx, setCurrentDatumIdx] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(-1);
    const [numDatums, setNumDatums] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(-1);
    const [inputSpec, setInputSpec] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [errorMessage, setErrorMessage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [debug, setDebug] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (showDatum && currentDatumIdx !== -1) {
            callShowDatum();
        }
    }, [currentDatumIdx, showDatum]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (showDatum && !keepMounted) {
            callUnmountAll();
        }
        if (keepMounted && currentDatumInfo) {
            setShouldShowCycler(true);
            setCurrentDatumIdx(currentDatumInfo.curr_idx);
            setNumDatums(currentDatumInfo.num_datums);
            setInputSpec(JSON.stringify(currentDatumInfo.input, null, 2));
        }
    }, [showDatum]);
    const callMountDatums = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        setErrorMessage('');
        console.log('==========>> DeBUG ', debug);
        console.log('==========>>> YOOOOO ', inputSpec);
        console.log('==========>>> len is ', inputSpec.length);
        try {
            const res = yield (0,_handler__WEBPACK_IMPORTED_MODULE_2__.requestAPI)('_mount_datums', 'PUT', {
                input: JSON.parse(inputSpec),
            });
            refresh();
            setCurrentDatumId(res.id);
            setCurrentDatumIdx(res.idx);
            setNumDatums(res.num_datums);
            setShouldShowCycler(true);
            setInputSpec(JSON.stringify(JSON.parse(inputSpec), null, 2));
        }
        catch (e) {
            console.log(e);
            if (e instanceof _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.ResponseError) {
                setErrorMessage('Bad data in input spec');
            }
            else if (e instanceof SyntaxError) {
                setErrorMessage('Poorly formatted json input spec');
            }
            else {
                setErrorMessage('Error mounting datums');
            }
        }
        setLoading(false);
    });
    const callShowDatum = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            const res = yield (0,_handler__WEBPACK_IMPORTED_MODULE_2__.requestAPI)(`_show_datum?idx=${currentDatumIdx}`, 'PUT');
            refresh();
            setCurrentDatumId(res.id);
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
    });
    const callUnmountAll = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            refresh();
            yield (0,_handler__WEBPACK_IMPORTED_MODULE_2__.requestAPI)('_unmount_all', 'PUT');
            refresh();
            yield pollRefresh();
            setCurrentDatumId('');
            setCurrentDatumIdx(-1);
            setNumDatums(0);
            setShouldShowCycler(false);
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
    });
    return {
        loading,
        shouldShowCycler,
        currentDatumId,
        currentDatumIdx,
        setCurrentDatumIdx,
        numDatums,
        inputSpec,
        setInputSpec,
        callMountDatums,
        callUnmountAll,
        errorMessage,
        setDebug,
    };
};


/***/ }),

/***/ "./lib/plugins/mount/components/FullPageError/FullPageError.js":
/*!*********************************************************************!*\
  !*** ./lib/plugins/mount/components/FullPageError/FullPageError.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_components_Svgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/components/Svgs */ "./lib/utils/components/Svgs/GenericError.js");
/* harmony import */ var _utils_components_Svgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils/components/Svgs */ "./lib/utils/components/Svgs/StatusWarning.js");


const FullPageError = ({ status }) => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: 'pachyderm-mount-base', style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_utils_components_Svgs__WEBPACK_IMPORTED_MODULE_1__["default"], { width: "280px", height: "130px" })),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: '1rem',
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_utils_components_Svgs__WEBPACK_IMPORTED_MODULE_2__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: { paddingLeft: '.5rem' } }, "Looks like there was an error")),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { "data-testid": "FullPageError__message" }, status.message)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FullPageError);


/***/ }),

/***/ "./lib/plugins/mount/components/SortableList/ListMount.js":
/*!****************************************************************!*\
  !*** ./lib/plugins/mount/components/SortableList/ListMount.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DISABLED_STATES": () => (/* binding */ DISABLED_STATES),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_components_Circle_Circle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/components/Circle/Circle */ "./lib/utils/components/Circle/Circle.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "webpack/sharing/consume/default/lodash/lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../handler */ "./lib/handler.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../utils/icons */ "./lib/utils/icons.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const DISABLED_STATES = [
    'unmounting',
    'mounting',
    'error',
];
const ListMount = ({ item, open, updateData }) => {
    const [disabled, setDisabled] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const branch = item.branch;
    const buttonText = 'Unmount';
    const behind = item.how_many_commits_behind;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        setDisabled(DISABLED_STATES.includes(item.state));
    }, [item]);
    const openFolder = () => {
        open(item.name);
    };
    const onClickHandler = () => {
        unmount();
    };
    const unmount = () => __awaiter(void 0, void 0, void 0, function* () {
        setDisabled(true);
        try {
            const data = yield (0,_handler__WEBPACK_IMPORTED_MODULE_2__.requestAPI)('_unmount', 'PUT', {
                mounts: [`${item.name}`],
            });
            updateData(data);
            open('');
        }
        catch (_a) {
            console.log('error unmounting repo');
        }
    });
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("li", { className: "pachyderm-mount-sortableList-item", "data-testid": "ListItem__branches" },
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", { className: `pachyderm-mount-list-item-name-branch-wrapper ${disabled ? 'pachyderm-mount-sortableList-disabled' : ''}`, onClick: openFolder },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", { className: "pachyderm-mount-list-item-name", title: item.name }, item.name),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", { className: "pachyderm-mount-list-item-branch" }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", { title: branch },
                    "@ ",
                    branch),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", { style: { marginLeft: '7px' }, "data-testid": "ListItem__commitBehindness" }, renderCommitBehindness(behind))))),
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", { className: "pachyderm-mount-list-item-action" },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", { disabled: disabled, onClick: onClickHandler, className: "pachyderm-button-link", "data-testid": `ListItem__${buttonText.toLowerCase()}` }, buttonText),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", { className: "pachyderm-mount-list-item-status", "data-testid": "ListItem__status" }, renderStatus(item.state, item.status)))));
};
const renderCommitBehindness = (behind) => {
    if (behind === 0) {
        return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, "\u2705 up to date");
    }
    else if (behind === 1) {
        return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null,
            "\u231B ",
            behind,
            " commit behind");
    }
    else {
        return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null,
            "\u231B ",
            behind,
            " commits behind");
    }
};
const renderStatus = (state, status) => {
    let color = 'gray';
    let statusMessage = '';
    switch (state) {
        case 'mounted':
            color = 'green';
            break;
        case 'unmounting':
        case 'mounting':
            color = 'yellow';
            break;
        case 'error':
            color = 'red';
            break;
    }
    if (status) {
        statusMessage = `${(0,lodash__WEBPACK_IMPORTED_MODULE_0__.capitalize)(state || 'Unknown')}: ${status}`;
    }
    else {
        statusMessage = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.capitalize)(state || 'Unknown');
    }
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_utils_components_Circle_Circle__WEBPACK_IMPORTED_MODULE_3__.Circle, { color: color, className: "pachyderm-mount-list-item-status-circle" }),
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { "data-testid": "ListItem__statusIcon", className: "pachyderm-mount-list-item-status-icon", title: statusMessage },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_utils_icons__WEBPACK_IMPORTED_MODULE_4__.infoIcon.react, { tag: "span" }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListMount);


/***/ }),

/***/ "./lib/plugins/mount/components/SortableList/ListUnmount.js":
/*!******************************************************************!*\
  !*** ./lib/plugins/mount/components/SortableList/ListUnmount.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DISABLED_STATES": () => (/* binding */ DISABLED_STATES),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../handler */ "./lib/handler.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const DISABLED_STATES = [
    'unmounting',
    'mounting',
    'error',
];
const ListUnmount = ({ item, open, updateData }) => {
    var _a;
    const [selectedBranch, setSelectedBranch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    const [disabled, setDisabled] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [authorized, setAuthorized] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const hasBranches = ((_a = item === null || item === void 0 ? void 0 : item.branches) === null || _a === void 0 ? void 0 : _a.length) > 0;
    const buttonText = 'Mount';
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        setAuthorized(item.authorization !== 'none');
    }, [item]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (hasBranches) {
            const found = item.branches.find((branch) => branch === 'master');
            setSelectedBranch(found ? found : item.branches[0]);
            setDisabled(false);
        }
    }, [item]);
    const onChange = (e) => {
        setSelectedBranch(e.target.value);
    };
    const onClickHandler = () => {
        mount();
    };
    const mount = () => __awaiter(void 0, void 0, void 0, function* () {
        setDisabled(true);
        try {
            if (selectedBranch) {
                const data = yield (0,_handler__WEBPACK_IMPORTED_MODULE_1__.requestAPI)('_mount', 'PUT', {
                    mounts: [
                        {
                            name: selectedBranch === 'master'
                                ? item.repo
                                : `${item.repo}_${selectedBranch}`,
                            repo: item.repo,
                            branch: selectedBranch,
                            mode: 'ro',
                        },
                    ],
                });
                updateData(data);
            }
            open('');
        }
        catch (_b) {
            console.log('error mounting or unmounting repo');
        }
    });
    if (!authorized) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { className: "pachyderm-mount-sortableList-item", "data-testid": "ListItem__unauthorized", style: { cursor: 'not-allowed' }, title: "You don't have the correct permissions to access this repository" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "pachyderm-mount-list-item-name-branch-wrapper pachyderm-mount-sortableList-disabled" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "pachyderm-mount-list-item-name", title: item.repo }, item.repo),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "pachyderm-mount-list-item-branch" }, "No read access"))));
    }
    if (!hasBranches) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { className: "pachyderm-mount-sortableList-item", "data-testid": "ListItem__noBranches", title: "Either all branches are mounted or the repo doesn't have a branch" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "pachyderm-mount-list-item-name-branch-wrapper pachyderm-mount-sortableList-disabled" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "pachyderm-mount-list-item-name", title: item.repo }, item.repo),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "pachyderm-mount-list-item-branch" }, "No branches"))));
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { className: "pachyderm-mount-sortableList-item", "data-testid": "ListItem__branches" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: `pachyderm-mount-list-item-name-branch-wrapper ${disabled ? 'pachyderm-mount-sortableList-disabled' : ''}` },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "pachyderm-mount-list-item-name", title: item.repo }, item.repo),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "pachyderm-mount-list-item-branch" }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "@ "),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", { disabled: disabled, name: "branch", value: selectedBranch, className: "pachyderm-mount-list-item-branch-select", onChange: onChange, "data-testid": "ListItem__select" }, item.branches.map((branch) => {
                    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", { key: branch, value: branch }, branch));
                }))))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "pachyderm-mount-list-item-action" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { disabled: disabled, onClick: onClickHandler, className: "pachyderm-button-link", "data-testid": `ListItem__${buttonText.toLowerCase()}` }, buttonText))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListUnmount);


/***/ }),

/***/ "./lib/plugins/mount/components/SortableList/SortableList.js":
/*!*******************************************************************!*\
  !*** ./lib/plugins/mount/components/SortableList/SortableList.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_hooks_useSort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils/hooks/useSort */ "./lib/utils/hooks/useSort.js");
/* harmony import */ var _ListMount__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ListMount */ "./lib/plugins/mount/components/SortableList/ListMount.js");
/* harmony import */ var _ListUnmount__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ListUnmount */ "./lib/plugins/mount/components/SortableList/ListUnmount.js");





const nameComparator = {
    name: 'Name',
    func: _utils_hooks_useSort__WEBPACK_IMPORTED_MODULE_2__.stringComparator,
    accessor: (item) => ('name' in item ? item.name : item.repo),
};
const SortableList = ({ open, items, updateData, }) => {
    const { sortedData, setComparator, reversed } = (0,_utils_hooks_useSort__WEBPACK_IMPORTED_MODULE_2__.useSort)({
        data: items,
        initialSort: nameComparator,
        initialDirection: 1,
    });
    const nameClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
        setComparator(nameComparator);
    }, [setComparator]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-sortableList" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-sortableList-header" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-sortableList-headerItem", onClick: nameClick },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Name"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, reversed ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.caretDownIcon.react, null) : react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.caretUpIcon.react, null)))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", { className: "pachyderm-mount-sortableList-content" }, sortedData &&
            sortedData.map((item) => 'name' in item ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ListMount__WEBPACK_IMPORTED_MODULE_3__["default"], { item: item, key: item.name, open: open, updateData: updateData })) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ListUnmount__WEBPACK_IMPORTED_MODULE_4__["default"], { item: item, key: item.repo, open: open, updateData: updateData }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SortableList);


/***/ }),

/***/ "./lib/plugins/mount/customFileBrowser.js":
/*!************************************************!*\
  !*** ./lib/plugins/mount/customFileBrowser.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/filebrowser */ "webpack/sharing/consume/default/@jupyterlab/filebrowser");
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/commands */ "webpack/sharing/consume/default/@lumino/commands");
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_commands__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mountDrive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mountDrive */ "./lib/plugins/mount/mountDrive.js");
/* harmony import */ var _mount__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mount */ "./lib/plugins/mount/mount.js");







const createCustomFileBrowser = (app, manager, factory) => {
    var _a;
    const drive = new _mountDrive__WEBPACK_IMPORTED_MODULE_5__.MountDrive(app.docRegistry);
    manager.services.contents.addDrive(drive);
    const browser = factory.createFileBrowser('jupyterlab-pachyderm-browser', {
        driveName: drive.name,
        state: null,
        refreshInterval: 10000,
    });
    try {
        const newLauncher = browser.toolbar.node.childNodes[0];
        const newFolder = browser.toolbar.node.childNodes[1];
        browser.toolbar.node.removeChild(newLauncher);
        browser.toolbar.node.removeChild(newFolder);
        const widgets = browser.layout.widgets || [];
        const breadCrumbs = widgets.find((element) => element instanceof _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_1__.BreadCrumbs);
        if (breadCrumbs) {
            (_a = breadCrumbs.node
                .querySelector('svg[data-icon="ui-components:folder"]')) === null || _a === void 0 ? void 0 : _a.replaceWith('/ pfs');
            const homeElement = breadCrumbs.node.querySelector('span[title="~/extension-wd"]');
            if (homeElement) {
                homeElement.className = 'jp-BreadCrumbs-item';
            }
        }
        const dirListing = widgets.find((element) => element instanceof _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_1__.DirListing);
        if (dirListing) {
            const commands = new _lumino_commands__WEBPACK_IMPORTED_MODULE_3__.CommandRegistry();
            commands.addCommand('file-open', {
                label: 'Open',
                icon: 'fa fa-folder',
                mnemonic: 0,
                execute: () => {
                    (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.each)(browser.selectedItems(), (item) => {
                        manager.openOrReveal(item.path);
                    });
                },
            });
            commands.addCommand('copy-path', {
                label: 'Copy Path',
                icon: 'fa fa-file',
                mnemonic: 0,
                execute: () => {
                    (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.each)(browser.selectedItems(), (item) => {
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.Clipboard.copyToSystem(item.path.replace(_mount__WEBPACK_IMPORTED_MODULE_6__.MOUNT_BROWSER_NAME, '/pfs/'));
                    });
                },
            });
            const menu = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Menu({ commands });
            menu.addItem({ command: 'file-open' });
            menu.addItem({ command: 'copy-path' });
            const browserContent = dirListing.node.getElementsByClassName('jp-DirListing-content')[0];
            browserContent.addEventListener('contextmenu', (event) => {
                event.stopPropagation();
                event.preventDefault();
                const x = event.clientX;
                const y = event.clientY;
                menu.open(x, y);
            });
        }
    }
    catch (e) {
        console.log('Failed to edit default browser.');
    }
    return browser;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createCustomFileBrowser);


/***/ }),

/***/ "./lib/plugins/mount/index.js":
/*!************************************!*\
  !*** ./lib/plugins/mount/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/docmanager */ "webpack/sharing/consume/default/@jupyterlab/docmanager");
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/filebrowser */ "webpack/sharing/consume/default/@jupyterlab/filebrowser");
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mount__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mount */ "./lib/plugins/mount/mount.js");




const mount = {
    id: 'jupyterlab-pachyderm:mount',
    autoStart: true,
    requires: [_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_1__.IDocumentManager, _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_2__.IFileBrowserFactory, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer],
    activate: (app, manager, factory, restorer) => {
        return new _mount__WEBPACK_IMPORTED_MODULE_3__.MountPlugin(app, manager, factory, restorer);
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mount);


/***/ }),

/***/ "./lib/plugins/mount/mount.js":
/*!************************************!*\
  !*** ./lib/plugins/mount/mount.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MOUNT_BROWSER_NAME": () => (/* binding */ MOUNT_BROWSER_NAME),
/* harmony export */   "MountPlugin": () => (/* binding */ MountPlugin)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utils/icons */ "./lib/utils/icons.js");
/* harmony import */ var _pollMounts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pollMounts */ "./lib/plugins/mount/pollMounts.js");
/* harmony import */ var _customFileBrowser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./customFileBrowser */ "./lib/plugins/mount/customFileBrowser.js");
/* harmony import */ var _components_Config_Config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Config/Config */ "./lib/plugins/mount/components/Config/Config.js");
/* harmony import */ var _components_Datum_Datum__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/Datum/Datum */ "./lib/plugins/mount/components/Datum/Datum.js");
/* harmony import */ var _components_SortableList_SortableList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/SortableList/SortableList */ "./lib/plugins/mount/components/SortableList/SortableList.js");
/* harmony import */ var _utils_components_LoadingDots_LoadingDots__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/components/LoadingDots/LoadingDots */ "./lib/utils/components/LoadingDots/LoadingDots.js");
/* harmony import */ var _components_FullPageError_FullPageError__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/FullPageError/FullPageError */ "./lib/plugins/mount/components/FullPageError/FullPageError.js");
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../handler */ "./lib/handler.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};














const MOUNT_BROWSER_NAME = 'mount-browser:';
class MountPlugin {
    constructor(app, manager, factory, restorer) {
        this._showConfig = false;
        this._showConfigSignal = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._showDatum = false;
        this._keepMounted = false;
        this._showDatumSignal = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._readyPromise = Promise.resolve();
        this.open = (path) => {
            this._app.commands.execute('filebrowser:open-path', {
                path: MOUNT_BROWSER_NAME + path,
            });
        };
        this.refresh = () => {
            this._app.commands.execute('filebrowser:refresh');
            this._app.commands.execute('filebrowser:open-path', {
                path: MOUNT_BROWSER_NAME,
            });
        };
        this.setShowDatum = (shouldShow) => {
            if (shouldShow) {
                this._datum.setHidden(false);
                this._mountedList.setHidden(true);
                this._unmountedList.setHidden(true);
            }
            else {
                this._datum.setHidden(true);
                this._mountedList.setHidden(false);
                this._unmountedList.setHidden(false);
            }
            this._mountBrowser.setHidden(false);
            this._config.setHidden(true);
            this._fullPageError.setHidden(true);
            this._showDatum = shouldShow;
            this._showDatumSignal.emit(shouldShow);
        };
        this.setKeepMounted = (keep) => {
            this._keepMounted = keep;
        };
        this.setShowConfig = (shouldShow) => {
            if (shouldShow) {
                this._config.setHidden(false);
                this._mountedList.setHidden(true);
                this._unmountedList.setHidden(true);
                this._mountBrowser.setHidden(true);
            }
            else {
                this._config.setHidden(true);
                this._mountedList.setHidden(false);
                this._unmountedList.setHidden(false);
                this._mountBrowser.setHidden(false);
            }
            this._datum.setHidden(true);
            this._fullPageError.setHidden(true);
            this._showConfig = shouldShow;
            this._showConfigSignal.emit(shouldShow);
        };
        this.setShowFullPageError = (shouldShow) => {
            if (shouldShow) {
                this._fullPageError.setHidden(false);
                this._config.setHidden(true);
                this._datum.setHidden(true);
                this._mountedList.setHidden(true);
                this._unmountedList.setHidden(true);
                this._mountBrowser.setHidden(true);
            }
            else {
                this._fullPageError.setHidden(true);
                this._config.setHidden(false);
                this._datum.setHidden(false);
                this._mountedList.setHidden(false);
                this._unmountedList.setHidden(false);
                this._mountBrowser.setHidden(false);
            }
        };
        this.updateConfig = (config) => {
            this._poller.config = config;
        };
        this.setup = () => __awaiter(this, void 0, void 0, function* () {
            yield this._poller.refresh();
            if (this._poller.status.code === 500) {
                this.setShowFullPageError(true);
            }
            else {
                this.setShowConfig(this._poller.config.cluster_status === 'INVALID' ||
                    this._poller.status.code !== 200);
                try {
                    const res = yield (0,_handler__WEBPACK_IMPORTED_MODULE_5__.requestAPI)('datums', 'GET');
                    if (res['num_datums'] > 0) {
                        this._keepMounted = true;
                        this._currentDatumInfo = res;
                        this.setShowDatum(true);
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
            this._loader.setHidden(true);
        });
        this._app = app;
        this._poller = new _pollMounts__WEBPACK_IMPORTED_MODULE_6__.PollMounts('PollMounts');
        // This is used to detect if the config goes bad (pachd address changes)
        this._poller.configSignal.connect((_, config) => {
            if (config.cluster_status === 'INVALID' && !this._showConfig) {
                this.setShowConfig(true);
            }
        });
        // This is used to detect if the user becomes unauthenticated of there are errors on the server
        this._poller.statusSignal.connect((_, status) => {
            if (status.code === 500) {
                this.setShowFullPageError(true);
            }
            if (status.code === 401 && !this._showConfig) {
                this.setShowConfig(true);
            }
        });
        this._readyPromise = this.setup();
        this._config = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.UseSignal, { signal: this._showConfigSignal }, (_, showConfig) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.UseSignal, { signal: this._poller.configSignal }, (_, authConfig) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.UseSignal, { signal: this._poller.statusSignal }, (_, status) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Config_Config__WEBPACK_IMPORTED_MODULE_7__["default"], { showConfig: showConfig ? showConfig : this._showConfig, setShowConfig: this.setShowConfig, reposStatus: status ? status.code : this._poller.status.code, updateConfig: this.updateConfig, authConfig: authConfig ? authConfig : this._poller.config, refresh: this._poller.refresh })))))))))));
        this._config.addClass('pachyderm-mount-config-wrapper');
        this._mountedList = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.UseSignal, { signal: this._poller.mountedSignal }, (_, mounted) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-base" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-config-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-base-title" }, "Mounted Repositories"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "pachyderm-button-link", onClick: () => this.setShowDatum(true) },
                    "Datum",
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.spreadsheetIcon.react, { tag: "span", className: "pachyderm-mount-icon-padding" })),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "pachyderm-button-link", onClick: () => this.setShowConfig(true) },
                    "Config",
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.settingsIcon.react, { tag: "span", className: "pachyderm-mount-icon-padding" }))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_SortableList_SortableList__WEBPACK_IMPORTED_MODULE_8__["default"], { open: this.open, items: mounted ? mounted : this._poller.mounted, updateData: this._poller.updateData })))));
        this._mountedList.addClass('pachyderm-mount-react-wrapper');
        this._unmountedList = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.UseSignal, { signal: this._poller.unmountedSignal }, (_, unmounted) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-base" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "pachyderm-mount-base-title" }, "Unmounted Repositories"),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_SortableList_SortableList__WEBPACK_IMPORTED_MODULE_8__["default"], { open: this.open, items: unmounted ? unmounted : this._poller.unmounted, updateData: this._poller.updateData })))));
        this._unmountedList.addClass('pachyderm-mount-react-wrapper');
        this._datum = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.UseSignal, { signal: this._showDatumSignal }, (_, showDatum) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Datum_Datum__WEBPACK_IMPORTED_MODULE_9__["default"], { showDatum: showDatum ? showDatum : this._showDatum, setShowDatum: this.setShowDatum, keepMounted: this._keepMounted, setKeepMounted: this.setKeepMounted, refresh: this.refresh, pollRefresh: this._poller.refresh, currentDatumInfo: this._currentDatumInfo })))));
        this._datum.addClass('pachyderm-mount-datum-wrapper');
        this._loader = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_utils_components_LoadingDots_LoadingDots__WEBPACK_IMPORTED_MODULE_10__["default"], null)));
        this._loader.addClass('pachyderm-mount-react-wrapper');
        this._fullPageError = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.UseSignal, { signal: this._poller.statusSignal }, (_, status) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_FullPageError_FullPageError__WEBPACK_IMPORTED_MODULE_11__["default"], { status: status ? status : this._poller.status })))));
        this._fullPageError.addClass('pachyderm-mount-react-wrapper');
        this._mountBrowser = (0,_customFileBrowser__WEBPACK_IMPORTED_MODULE_12__["default"])(app, manager, factory);
        this._panel = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.SplitPanel();
        this._panel.orientation = 'vertical';
        this._panel.spacing = 0;
        this._panel.title.icon = _utils_icons__WEBPACK_IMPORTED_MODULE_13__.mountLogoIcon;
        this._panel.title.caption = 'Pachyderm Mount';
        this._panel.id = 'pachyderm-mount';
        this._panel.addWidget(this._mountedList);
        this._panel.addWidget(this._unmountedList);
        this._panel.addWidget(this._datum);
        this._panel.addWidget(this._mountBrowser);
        // SplitPanel.setStretch(this._mountedList, 1);
        // SplitPanel.setStretch(this._unmountedList, 1);
        // SplitPanel.setStretch(this._datum, 5);
        // SplitPanel.setStretch(this._mountBrowser, 3);
        this._panel.setRelativeSizes([1, 1, 3, 3]);
        this._panel.addWidget(this._loader);
        this._panel.addWidget(this._config);
        this._panel.addWidget(this._fullPageError);
        //default view: hide all till ready
        this._config.setHidden(true);
        this._fullPageError.setHidden(true);
        this._mountedList.setHidden(true);
        this._unmountedList.setHidden(true);
        this._datum.setHidden(true);
        this._mountBrowser.setHidden(true);
        window.addEventListener('resize', () => {
            this._panel.update();
        });
        restorer.add(this._panel, 'jupyterlab-pachyderm');
        app.shell.add(this._panel, 'left', { rank: 100 });
    }
    get mountedRepos() {
        this._poller.poll.tick;
        return this._poller.mounted;
    }
    get unmountedRepos() {
        this._poller.poll.tick;
        return this._poller.unmounted;
    }
    get layout() {
        return this._panel;
    }
    get ready() {
        return this._readyPromise;
    }
}


/***/ }),

/***/ "./lib/plugins/mount/mountDrive.js":
/*!*****************************************!*\
  !*** ./lib/plugins/mount/mountDrive.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MountDrive": () => (/* binding */ MountDrive)
/* harmony export */ });
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../handler */ "./lib/handler.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class MountDrive {
    constructor(registry) {
        this._fileChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
        this._serverSettings = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__.ServerConnection.makeSettings();
        this._isDisposed = false;
        this._registry = registry;
    }
    get name() {
        return 'mount-browser';
    }
    get fileChanged() {
        return this._fileChanged;
    }
    get serverSettings() {
        return this._serverSettings;
    }
    get isDisposed() {
        return this._isDisposed;
    }
    get(localPath, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0,_handler__WEBPACK_IMPORTED_MODULE_3__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join('pfs', localPath), 'GET');
                return response;
            }
            catch (e) {
                console.log('/pfs not found');
                return {
                    name: '',
                    path: '',
                    last_modified: '2022-04-26T16:28:48.015858Z',
                    created: '2022-04-26T16:28:48.015858Z',
                    content: [],
                    format: 'json',
                    mimetype: '',
                    size: undefined,
                    writable: true,
                    type: 'directory',
                };
            }
        });
    }
    getDownloadUrl(localPath) {
        throw new Error('Method not implemented.');
    }
    newUntitled(options) {
        throw new Error('Method not implemented.');
    }
    delete(localPath) {
        throw new Error('Method not implemented.');
    }
    rename(oldLocalPath, newLocalPath) {
        throw new Error('Method not implemented.');
    }
    save(localPath, options) {
        throw new Error('Method not implemented.');
    }
    copy(localPath, toLocalDir) {
        throw new Error('Method not implemented.');
    }
    createCheckpoint(localPath) {
        return Promise.resolve({ id: 'e', last_modified: 'e' });
    }
    listCheckpoints(localPath) {
        return Promise.resolve([]);
    }
    restoreCheckpoint(localPath, checkpointID) {
        return Promise.resolve();
    }
    deleteCheckpoint(localPath, checkpointID) {
        return Promise.resolve();
    }
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal.clearData(this);
    }
}


/***/ }),

/***/ "./lib/plugins/mount/pollMounts.js":
/*!*****************************************!*\
  !*** ./lib/plugins/mount/pollMounts.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MOUNTED_STATES": () => (/* binding */ MOUNTED_STATES),
/* harmony export */   "PollMounts": () => (/* binding */ PollMounts),
/* harmony export */   "UNMOUNTED_STATES": () => (/* binding */ UNMOUNTED_STATES)
/* harmony export */ });
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/polling */ "./node_modules/@lumino/polling/dist/index.es6.js");
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../handler */ "./lib/handler.js");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const MOUNTED_STATES = [
    'unmounting',
    'mounted',
    'mounting',
    'error',
];
const UNMOUNTED_STATES = [
    'gone',
    'discovering',
    'unmounted',
];
class PollMounts {
    constructor(name) {
        this._rawData = {};
        this._mounted = [];
        this._unmounted = [];
        this._status = { code: 999, message: '' };
        this._config = {
            pachd_address: '',
            cluster_status: 'INVALID',
        };
        this._mountedSignal = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal(this);
        this._unmountedSignal = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal(this);
        this._statusSignal = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal(this);
        this._configSignal = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal(this);
        this._dataPoll = new _lumino_polling__WEBPACK_IMPORTED_MODULE_1__.Poll({
            auto: true,
            factory: () => __awaiter(this, void 0, void 0, function* () { return this.getData(); }),
            frequency: {
                interval: 2000,
                backoff: true,
                max: 5000,
            },
        });
        this.refresh = () => __awaiter(this, void 0, void 0, function* () {
            yield this._dataPoll.refresh();
            yield this._dataPoll.tick;
        });
        this.updateData = (data) => {
            if (JSON.stringify(data) !== JSON.stringify(this._rawData)) {
                this._rawData = data;
                this.mounted = Array.from(Object.values(data.mounted));
                this.unmounted = Array.from(Object.values(data.unmounted));
            }
        };
        this.name = name;
    }
    get mounted() {
        return this._mounted;
    }
    set mounted(data) {
        if (data === this._mounted) {
            return;
        }
        this._mounted = data;
        this._mountedSignal.emit(data);
    }
    get unmounted() {
        return this._unmounted;
    }
    set unmounted(data) {
        if (data === this._unmounted) {
            return;
        }
        this._unmounted = data;
        this._unmountedSignal.emit(data);
    }
    get status() {
        return this._status;
    }
    set status(status) {
        if (JSON.stringify(status) === JSON.stringify(this._status)) {
            return;
        }
        this._status = status;
        this._statusSignal.emit(status);
    }
    get config() {
        return this._config;
    }
    set config(config) {
        if (JSON.stringify(config) === JSON.stringify(this._config)) {
            return;
        }
        this._config = config;
        this._configSignal.emit(config);
    }
    get mountedSignal() {
        return this._mountedSignal;
    }
    get unmountedSignal() {
        return this._unmountedSignal;
    }
    get statusSignal() {
        return this._statusSignal;
    }
    get configSignal() {
        return this._configSignal;
    }
    get poll() {
        return this._dataPoll;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const config = yield (0,_handler__WEBPACK_IMPORTED_MODULE_3__.requestAPI)('config', 'GET');
                this.config = config;
                if (config.cluster_status !== 'INVALID') {
                    const data = yield (0,_handler__WEBPACK_IMPORTED_MODULE_3__.requestAPI)('mounts', 'GET');
                    this.status = { code: 200 };
                    this.updateData(data);
                }
            }
            catch (error) {
                if (error instanceof _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__.ServerConnection.ResponseError) {
                    this.status = {
                        code: error.response.status,
                        message: error.response.statusText,
                    };
                }
            }
        });
    }
}


/***/ }),

/***/ "./lib/plugins/telemetry/index.js":
/*!****************************************!*\
  !*** ./lib/plugins/telemetry/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _telemetry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./telemetry */ "./lib/plugins/telemetry/telemetry.js");

const telemetry = {
    id: 'jupyterlab-pachyderm:telemetry',
    autoStart: true,
    activate: (app) => {
        (0,_telemetry__WEBPACK_IMPORTED_MODULE_0__.init)(app);
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (telemetry);


/***/ }),

/***/ "./lib/plugins/telemetry/telemetry.js":
/*!********************************************!*\
  !*** ./lib/plugins/telemetry/telemetry.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CLICK_TIMEOUT": () => (/* binding */ CLICK_TIMEOUT),
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rudder_sdk_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rudder-sdk-js */ "webpack/sharing/consume/default/rudder-sdk-js/rudder-sdk-js");
/* harmony import */ var rudder_sdk_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rudder_sdk_js__WEBPACK_IMPORTED_MODULE_2__);



const CLICK_TIMEOUT = 500;
/**
 * TODO: This captures a lot of events. Some we might want to filter out.
 * Some events don't get captured if clicked from top level menus.
 * We'll need to figure out if menu command tracking is different,
 * or maybe even add custom tracking for them.
 */
const initCommandTracking = (app) => {
    app.commands.commandExecuted.connect((_, command) => {
        (0,rudder_sdk_js__WEBPACK_IMPORTED_MODULE_2__.track)('command', {
            id: command.id,
            // We have to copy the args to a plain object
            args: JSON.parse(JSON.stringify(command.args)),
        });
    });
};
const initNotebookTracking = () => {
    _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__.NotebookActions.executed.connect((_, action) => {
        // This transforms '[1]: pachctl version' to 'pachctl version'
        const promptText = action.cell.promptNode.innerText;
        const actionText = action.cell.inputArea.node.innerText.replace(promptText ? promptText + '\n' : '', '');
        (0,rudder_sdk_js__WEBPACK_IMPORTED_MODULE_2__.track)('command', {
            id: 'notebook:action:executed',
            args: {
                action: actionText,
            },
        });
    });
};
const initTerminalTracking = () => {
    // TODO: what info do we want to track from a terminal?
};
const handleClick = lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()((evt) => {
    const element = evt.target;
    const clickId = element.getAttribute('data-testid');
    if (clickId) {
        (0,rudder_sdk_js__WEBPACK_IMPORTED_MODULE_2__.track)('notebook:click', { clickId });
    }
}, CLICK_TIMEOUT, {
    leading: true,
    trailing: false,
});
const initClickTracking = () => {
    if (window.document.onclick === handleClick) {
        return;
    }
    window.document.addEventListener('click', handleClick);
};
const init = (app) => {
    (0,rudder_sdk_js__WEBPACK_IMPORTED_MODULE_2__.load)('20C6D2xFLRmyFTqtvYDEgNfwcRG', 'https://pachyderm-dataplane.rudderstack.com');
    initCommandTracking(app);
    initNotebookTracking();
    initTerminalTracking();
    initClickTracking();
};


/***/ }),

/***/ "./lib/utils/components/Circle/Circle.js":
/*!***********************************************!*\
  !*** ./lib/utils/components/Circle/Circle.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Circle": () => (/* binding */ Circle),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};


const colors = {
    green: 'green',
    red: 'red',
    yellow: 'yellow',
    gray: 'gray',
};
const Circle = (_a) => {
    var { children, className, color = 'gray' } = _a, props = __rest(_a, ["children", "className", "color"]);
    const classes = classnames__WEBPACK_IMPORTED_MODULE_0___default()('jp-circle-base', className, {
        ['jp-circle-green']: color === colors.green,
        ['jp-circle-red']: color === colors.red,
        ['jp-circle-yellow']: color === colors.yellow,
        ['jp-circle-gray']: color === colors.gray,
    });
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", Object.assign({ className: classes }, props), children));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Circle);


/***/ }),

/***/ "./lib/utils/components/LoadingDots/LoadingDots.js":
/*!*********************************************************!*\
  !*** ./lib/utils/components/LoadingDots/LoadingDots.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const LoadingDots = () => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: 'jp-dots-container' },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: 'jp-dots-base', role: "status", "aria-label": "loading" })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoadingDots);


/***/ }),

/***/ "./lib/utils/components/Svgs/GenericError.js":
/*!***************************************************!*\
  !*** ./lib/utils/components/Svgs/GenericError.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const SvgGenericError = (props) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", width: 400, height: 180, viewBox: "320 -20 180 270", xmlnsXlink: "http://www.w3.org/1999/xlink" }, props),
    react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null,
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { id: "genericError_svg__b", d: "m197.12 159.04 29.68 53.2h-59.36z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M10.328 21.474S-2.853 8.286 65.634.379C81.999-1.51 90.868 3.838 112.578 12.5c36.95 14.745 24.243 55.33 6.414 95.06-11.501 25.63-4.968 28.555-6.252 32.503-1.283 3.948-8.707 3.948-15.164 3.948-6.456 0-6.76-2.39-6.364-3.948.246-.976-1.33-13.27.812-29.328.793-5.951.793-9.918 2.776-16.663 0 0-8.443 1.83-13.484 1.587-14.277-.69-8.17 49.34-8.546 51.573-.793 4.682-7.515 5.59-13.068 4.967-5.552-.623-11.411-.04-10.221-3.158 1.88-4.93 4.868-54.175-5.047-54.175-18.243 0-.504 52.136-1.376 54.175-1.19 2.777-8.104 2.952-15.183 2.952-4.787 0-7.212-.397-6.816-4.76.179-1.984.77-8.72-2.752-16.857-5.646-13.045-5.013-28.873-5.6-36.304-.98-12.5-26.48-44.305-2.38-72.598z", id: "genericError_svg__c" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M.233 11.923c-.67-2.18 2.637-5.33 4.313-6.876C7.318 2.492 15.874 2.03 21.823.84c17.35-3.471 30.886 8.239 35.072 23.864C60.3 37.418 52.657 38.986 44.687 51.65s-.477 20.622-7.089 24.448c-5.022 2.906-9.033-2.074-15.775-3.661-5.794-1.365-4.648-11.303-7.932-9.918-4.445 1.868-4.414-19.836-3.569-24.597l-10.089-26z", id: "genericError_svg__e" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M58.575 14.09c.9-2.021.648-4.37-.659-6.154C55.76 5.072 50.524 2.263 45.13.898c-9.92-2.506-25.258 1.039-32.977 3.595C2.826 7.582.052 10.526.099 19.227c.052 9.364 8.586 16.238 8.784 24.271.189 7.612.734 11.26 6.293 23.491 5.559 12.232 4.641-4.74 18.818-5.044 5.451-.117 2.503-1.936 5.29-.167 3.768 2.38 6.715-18.832 6.6-23.576l12.69-24.113z", id: "genericError_svg__g" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M83.82 79.64c-6.345 2.217-19.88 15.57-24.786 18.843-9.518 6.347-8.296 29.201-26.89 26.982-19.216-2.292-26.467-17.343-29.19-24.627-.922-2.466-5.092-12.956.012-10.669 5.103 2.287 8.686-7.897 9.395-1.504 1.477 13.317 10.228 23.042 17.365 22.005 7.638-1.11 10.64-27.853 10.867-31.824.641-11.237-7.678-16.888-10.664-27.992-.704-2.617-1.111-5.536-1.036-8.903.046-2.021 2.22-3.22 2.483-5.157.413-3.05-.927-6.77 0-9.563C35.699 14.207 45.439 4.316 59.034.614c3.603-.982 6.76 0 10.696 0 4.574 0 11.664-1.381 15.937 0a43.42 43.42 0 0 1 25.368 21.66c1.581 3.115-.795 6.23 0 9.64.746 3.205 4.71 6.693 4.71 10.037 0 19.65-14.277 31.511-31.925 37.688z", id: "genericError_svg__i" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-40.8%", y: "-46.2%", width: "181.6%", height: "190.4%", filterUnits: "objectBoundingBox", id: "genericError_svg__a" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMorphology", { radius: 1.008, operator: "dilate", in: "SourceAlpha", result: "shadowSpreadOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { in: "shadowSpreadOuter1", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 7.5, in: "shadowOffsetOuter1", result: "shadowBlurOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feComposite", { in: "shadowBlurOuter1", in2: "SourceAlpha", operator: "out", result: "shadowBlurOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.130709135 0", in: "shadowBlurOuter1" }))),
    react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(2 1)", fill: "none", fillRule: "evenodd" },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(139 197.12 185.64)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#000", filter: "url(#genericError_svg__a)", xlinkHref: "#genericError_svg__b" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { stroke: "#26101A", strokeWidth: 2.016, fill: "#F2E9E9", xlinkHref: "#genericError_svg__b" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#26101A", strokeWidth: 2.24, fill: "#5DA7B5", d: "m317.396 141.882 39.122 9.754-9.754 39.122-39.122-9.754z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M675.545 75.727c-3.193 0 3.748 3.874 2.037 10.321-1.41 5.31 1.195 7.554 3.005 8.722 6.742 4.363 11.501-1.587 11.501-1.587", stroke: "#26101A", strokeWidth: 1.985, strokeLinecap: "round" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M676.516 75.727c-3.117 0-2.274 14.948 4.071 19.043 2.082 1.348 3.966 1.797 5.596 1.586 8.285-1.19 10.664 2.777 10.664 2.777", stroke: "#26101A", strokeWidth: 1.985, strokeLinecap: "round" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M675.545 75.727c-.551 4.382-1.303 14.948 5.042 19.043 2.082 1.348 3.966 1.78 5.596 1.586 5.905-.793 6.698 3.968 6.698 3.968", stroke: "#26101A", strokeWidth: 1.985, strokeLinecap: "round" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M636.38 112.062s-7.396 6.836-7.733 7.141c-3.966 3.57-7.733 9.521-7.535 39.275.043 6.348-22.407 2.777-22.407 2.777l8.328-48.796 29.347-.397z", stroke: "#26101A", strokeWidth: 1.588, fill: "#4C3D6A", fillRule: "nonzero" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(543.353 20.93)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", { id: "genericError_svg__d", fill: "#fff" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#genericError_svg__c" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { stroke: "#26101A", strokeWidth: 1.985, fill: "#4F728F", fillRule: "nonzero", xlinkHref: "#genericError_svg__c" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M93.027 22.446c21.305 9.066 32.66 16.725 34.063 22.976 1.404 6.25 1.404 20.58 0 42.99 10.24-31.737 15.361-47.899 15.361-48.486 0-.588-6.56-9.394-19.68-26.418L99.96 8.616l-6.932 13.83z", fill: "#4F6486", mask: "url(#genericError_svg__d)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M135.748 56.31c1.094-13.244-2.353-23.66-10.343-31.25-7.99-7.588-17.794-11.228-29.414-10.92L88.642-2.958c16.41 4.543 28.664 9.38 36.763 14.51 8.1 5.132 18.41 14.59 30.928 28.373L135.748 56.31z", fill: "#5DA7B5", mask: "url(#genericError_svg__d)" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M553.68 42.403S540.5 29.216 608.988 21.31c16.365-1.89 25.234 3.458 46.944 12.12 25.316 10.103 27.322 32.335 20.341 58.112-3.208 11.845-8.314 24.44-13.927 36.95-11.501 25.629-4.968 28.554-6.252 32.501-1.283 3.948-8.707 3.948-15.164 3.948-6.456 0-6.76-2.388-6.364-3.948.246-.975-1.33-13.269.812-29.328.793-5.95.793-9.918 2.776-16.662 0 0-8.443 1.829-13.484 1.587-14.277-.69-8.17 49.34-8.546 51.573-.793 4.681-7.515 5.59-13.068 4.966-5.552-.622-11.411-.039-10.221-3.157 1.88-4.931 4.868-54.176-5.047-54.176-18.243 0-.504 52.137-1.376 54.176-1.19 2.777-8.104 2.952-15.183 2.952-4.787 0-7.212-.397-6.816-4.761.179-1.984.77-8.719-2.752-16.856-5.646-13.046-5.013-28.873-5.6-36.304-.98-12.5-26.48-44.305-2.38-72.599z", stroke: "#26101A", strokeWidth: 1.985 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M638.597 139.682c1.932.36 3.507.495 5.506.135m-5.948 3.038c2.365.36 4.294.496 6.741.135", stroke: "#26101A", strokeWidth: 1.985, strokeLinecap: "round", strokeLinejoin: "round" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(-6 404.833 -4736.362)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M49.015 70.783s-2.433 6.916-7.485 12.812C32.836 93.741 15.155 94.97 16.476 97.342c.658 1.19 19.58-.347 28.15-7.546 5.377-4.516 10.842-10.71 10.842-10.71l-6.453-8.303z", stroke: "#26101A", strokeWidth: 1.985, fill: "#E1D9BE", fillRule: "nonzero" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M48.961 135.475c11.916-6.518 3.355-9.987 13.19-23.027.397-.523 2.035-2.44 2.8-3.268 4.55-4.94 20.331-14.388 27.192-16.364 4.988-1.43 9.955-7.83 14.451-9.918 5.485-2.546 8.715.283 12.51-2.038 1.034-.635 6.718.31 7.254-.071 5.155-3.662 6.121-9.8 8.22-12.57 25.976-34.315-24.334-60.02-49.715-50.5-25.382 9.522-37.445 90.432-37.445 90.432.15 6.759.224 11.336.218 13.732-.007 3.523.434 8.054 1.325 13.592z", fill: "#4F597E", fillRule: "nonzero", style: {
                    mixBlendMode: 'darken',
                } }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(87.373 .146)" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", { id: "genericError_svg__f", fill: "#fff" },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#genericError_svg__e" })),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { stroke: "#26101A", strokeWidth: 1.985, fill: "#4F728F", fillRule: "nonzero", xlinkHref: "#genericError_svg__e" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M-.92 13.546c4.59-3.372 7.97-5.578 10.134-6.618 3.246-1.56 10.106-1.361 12.611-2.032 2.505-.672 12.473-1.15 16.764 1.357 4.29 2.508 14.15 7.218 18.837 24.72 3.125 11.667 4.276 2.253 3.454-28.241L17.75-10.315-3.569 3.657l2.649 9.89z", fill: "#5DA7B5", mask: "url(#genericError_svg__f)" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M.233 11.923c-.67-2.18 2.637-5.33 4.313-6.876C7.318 2.492 15.874 2.03 21.823.84c17.35-3.471 30.886 8.239 35.072 23.864C60.3 37.418 52.657 38.986 44.687 51.65s-.477 20.622-7.089 24.448c-5.022 2.906-9.033-2.074-15.775-3.661-5.794-1.365-4.648-11.303-7.932-9.918-4.445 1.868-4.414-19.836-3.569-24.597l-10.089-26z", stroke: "#26101A", strokeWidth: 1.985, mask: "url(#genericError_svg__f)" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(8.334 5.235)" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", { id: "genericError_svg__h", fill: "#fff" },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#genericError_svg__g" })),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { stroke: "#26101A", strokeWidth: 1.985, fill: "#4F728F", fillRule: "nonzero", xlinkHref: "#genericError_svg__g" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M46.69 2.466c-4.585-.106-8.373.242-11.364 1.043-4.487 1.203-6.476 1.911-18.47 2.512C4.863 6.622-.063 14.998-.28 21.933c-.217 6.935 1.281 6.47-3.228-4.526-3.006-7.33 1.93-12.721 14.805-16.173l35.652-6.788-.258 8.02z", fill: "#5DA7B5", mask: "url(#genericError_svg__h)" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M66.908 19.325c.9-2.021.65-4.37-.658-6.153-2.157-2.865-7.392-5.673-12.786-7.038-9.92-2.506-25.258 1.038-32.977 3.595C11.16 12.817 8.385 15.76 8.433 24.462c.052 9.364 8.586 16.238 8.784 24.272.189 7.611.733 11.259 6.293 23.49 5.559 12.232 4.641-4.74 18.818-5.044 5.45-.116 2.503-1.936 5.29-.166 3.768 2.38 6.715-18.832 6.6-23.577l12.69-24.112z", stroke: "#26101A", strokeWidth: 1.985 }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M84.013 87.064c-6.345 2.217-19.88 15.57-24.786 18.844-9.518 6.347-7.236 29.731-25.83 27.513-19.216-2.293-23.962-12.394-26.685-19.677-.922-2.467-8.657-18.437-3.553-16.15 5.103 2.287 4.782-5.55 9.037-1.003 1.968 2.101-.385 4.36.702 7.57 2.442 7.22 7.893 15.99 16.861 15.452 6.864-.412 10.8-29.371 11.027-33.343.641-11.237-7.678-16.887-10.664-27.991-.704-2.617-1.111-5.536-1.036-8.903.046-2.022 2.22-3.22 2.483-5.157.413-3.05-.927-6.77 0-9.563C35.892 21.632 45.632 11.741 59.227 8.04c3.603-.982 6.76 0 10.695 0 4.575 0 11.665-1.381 15.938 0a43.42 43.42 0 0 1 25.368 21.66c1.581 3.114-.795 6.23 0 9.64.746 3.205 4.71 6.693 4.71 10.037 0 19.65-14.277 31.511-31.925 37.688z", fill: "#4F728F", fillRule: "nonzero" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M61.606 7.522S46.14 10.82 46.14 35.292c0 14.282 15.046 17.34 11.105 30.548-.607 2.033-12.663 6.668-12.108 8.617.384 1.347 9.4-1.657 12.738.502 3.339 2.16 4.306 3.647 6.298 5.757.372.394-7.423-4.17-12.492-4.165-5.493.005-8.222 4.562-5.75 4.562 1.67 0 3.498-1.65 5.75-1.59 2.77.076 6.008 1.928 9.716 5.557-5.41-1.096-8.793-1.625-10.149-1.587-5.375.15-5.291 2.184-5.714 2.777-.822 1.152 7.919.098 7.931 1.587.031 3.644-6.373 11.766-8.614 14.2-3.738 4.06-6.617 22.327-16.281 20.154-8.542-1.92-13.264-7.407-14.168-16.46 7.622 10.443 13.402 14.24 17.339 11.39 6.578-4.762 10.715-33.107 6.071-43.764-1.451-3.336-5.5-7.656-6.94-13.29 0 0-3.432-7.005-1.785-10.513 3.353-7.136 2.199-15.708 7.007-23.339C47.593 7.987 61.606 7.522 61.606 7.522z", fill: "#4F6486", fillRule: "nonzero" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(.193 7.425)" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", { id: "genericError_svg__j", fill: "#fff" },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#genericError_svg__i" })),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M5.011 81.27c-2.605 4.429-3.17 7.434-1.697 9.016 2.21 2.373 6.144-4.162 6.51 3.494.367 7.655 15.479 28.016 23.672 18.82 5.462-6.13 8.031-18.81 7.707-38.04L28.51 92.935l-8.457-4.748L5.01 81.27zM44.116 7.618c11.27-5.184 17.278-6.384 18.024-3.6 1.12 4.178-3.425 2.334-1.771 3.1 1.654.765 12.914-7.68 25.099-3.808 8.122 2.581 14.99 6.553 20.603 11.915l13.915-10.909L75.442-18.15l-13.67 7.754L44.116 7.618z", fill: "#5DA7B5", mask: "url(#genericError_svg__j)" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M49.709 62.07c0-1.642-1.333-2.578-2.975-2.578-1.642 0-2.974.936-2.974 2.579a2.975 2.975 0 1 0 5.949 0zm34.776.112c.635-2.71-1.586-4.245-4.109-3.805a2.979 2.979 0 0 0-2.502 2.543c-.262 2.444 2.24 5.181 4.838 3.714a3.785 3.785 0 0 0 1.773-2.452z", fill: "#26101A", fillRule: "nonzero" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M45.136 87.46s2.727-1.519 6.03-1.365c3.302.154 5.92 1.838 7.057 3.746M7.98 101.834c-2.379 1.487-4.222.654-4.222.654M45.533 81.51c2.03-1.344 4.451-1.856 7.265-1.537 4.785.543 8.085 3.035 8.878 5.018M45.93 75.56c1.79-1.44 4.542-1.905 8.257-1.396 5.574.764 9.334 4.52 9.985 6.95M84.043 50.72c-.57 1.106-.47 2.138-.001 3.065.95 1.874 3.413 3.318 4.923 4.073 1.224.612 2.519.842 3.326.625m-46.95-6.885c1.946-1.315 3.066.06 4.711.756 1.925.816 4.017-.866 4.71 1.725m-43.607 62.044c-.816.686-2.442 1.27-3.877 1.096m7.585 2.017c-.816.686-2.442 1.27-3.877 1.096m8.351 1.812c-.816.686-2.442 1.27-3.877 1.096M33.7 56.65c-2.214 3.473-.661 8.396.612 11.768M15.55 20.436c0-4.562 5.646-8.55 12.862-8.55 11.831 0 17.216-6.76 28.225-3.372", stroke: "#26101A", strokeWidth: 1.985, strokeLinecap: "round" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M100.635 77.528s6.037-4.728 9.64-4.728c2.816 0 6.659-14.131 16.166-23.246 9.683-9.282 11.745-25.6 3.978-21.943-4.163 1.96-7.587 3.745-10.442 3.621-2.642-.114-3.898-3.549-8.986-10.276-5.089-6.727-8.222-1.076-.54 8.942 1.32 1.722 1.98 14.141 2.217 16.661.781 8.306-1.566 6.596-2.392 10.979-2.512 13.326-9.641 19.99-9.641 19.99z", fill: "#4E567C", fillRule: "nonzero", style: {
                    mixBlendMode: 'darken',
                } }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M7.489 102.347c3.09 1.318-5.813 1.518 1.2 8.95 7.013 7.433 12.031 17.795 27.863 16.776 6.066-.392 12.135-16.698 14.032-19.068 8.07-10.08 9.6-9.918 17.367-14.999a53.134 53.134 0 0 1 14.674-6.744s-7.62 5.498-11.637 10.258c-2.205 2.613-6.292 5.26-15.184 13.568-7.825 7.311-4.994 17.265-17.244 21.217-4.663 1.505-11.796-.584-20.612-4.4-8.816-3.817-11.605-11.618-14.357-17.143l-2.77-10.82c.184-1.755 1.332-2.521 3.442-2.3 3.491.368-1.121 2.852 3.226 4.705z", fill: "#4D4C75", fillRule: "nonzero", style: {
                    mixBlendMode: 'darken',
                } }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("ellipse", { fill: "#C3E5D7", fillRule: "nonzero", cx: 79.471, cy: 62.405, rx: 1, ry: 1.19 }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { fill: "#C3E5D7", fillRule: "nonzero", cx: 45.166, cy: 63.079, r: 1 }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M35.035 21.804c-4.118 5.089-6.756 9.141-8.457 14.237-.649 1.943-.23 4.44-.636 6.801-.273 1.585-1.717 2.85-1.615 4.749.968 17.999 5.377 27.667 5.377 27.667l4.769-5.105-.794-2.965s-5.386-9.68-4.593-17.614c.227-2.266 1.255-2.737 1.74-5.355 1.215-6.547 2.736-15.727 6.985-20.828A86.385 86.385 0 0 1 50.105 11.49c-.944.138-9.593 3.542-15.07 10.314z", fill: "#4F597E", fillRule: "nonzero", style: {
                    mixBlendMode: 'darken',
                } }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M50.105 11.49c-.944.138-10.31 1.586-16.656 5.157-9.34 5.252-15.98 12.222-13.88 23.406 2.605 13.882 6.503 36.178 6.503 36.178l3.632-.973L27.5 67.03s-3.173-10.712-2.38-18.646c.794-7.934 3.966-17.455 9.915-24.596 5.73-6.895 15.07-12.298 15.07-12.298z", fill: "#4F6486", fillRule: "nonzero", style: {
                    mixBlendMode: 'darken',
                } }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M84.013 87.064c-6.345 2.217-19.865 17.811-24.77 21.084-9.519 6.348-9.926 26.946-25.635 24.936-19.198-2.457-26.202-13.353-28.925-20.637-.922-2.466-6.628-17.14-1.524-14.853 2.497 1.12 4.917-2.103 5.553-2.734.637-.63 2.5-1.736 3.842 1.23 2.334 5.158-1.647 10.397 11.467 20.239.523.393 1.03.713 1.524.964 11.857 6.061 15.024-27.21 15.24-31.023.642-11.237-7.677-16.887-10.663-27.991-.704-2.617-1.111-5.536-1.036-8.903.046-2.022 2.22-3.22 2.483-5.157.413-3.05-.927-6.77 0-9.563C35.892 21.632 45.632 11.741 59.227 8.04c3.603-.982 6.76 0 10.695 0 4.575 0 11.665-1.381 15.938 0a43.42 43.42 0 0 1 25.368 21.66c1.581 3.114-.795 6.23 0 9.64.746 3.205 4.71 6.693 4.71 10.037 0 19.65-14.277 31.511-31.925 37.688z", stroke: "#26101A", strokeWidth: 1.985 }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M82.443 83.001c2.137.397 2.38 2.543 2.01 4.678-.587 3.265-2.82 10.172-5.496 14.654-5.295 8.86-23.6 22.004-25.56 20.207-1.19-1.075 15.784-16.577 18.366-21.56 4.04-7.803 4.584-16.019 4.584-16.019s.944-2.634 5.29-2.083c.286.056.556.08.806.123z", stroke: "#26101A", strokeWidth: 1.985, fill: "#E1D9BE", fillRule: "nonzero", strokeLinecap: "round", strokeLinejoin: "round" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#26101A", strokeWidth: 1.985, strokeLinecap: "round", d: "m75.673 79.526.397 6.744M59.623 15.89s3.57-7.935 15.467-7.935m12.48 72.761-1.586 5.158" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M560.47 148.41a7.061 7.061 0 0 0 5.505-1.274m-4.315 4.05a7.061 7.061 0 0 0 5.505-1.273m32.916-4.761a7.481 7.481 0 0 0 5.949.397m11.5-21.422c1.587-8.728 4.922-16.266 5.318-23.803m12.529 30.15c1.19-20.63 10.708-21.82 7.138-36.895m-42.434 55.144s3.605 1.741 6.742.397", stroke: "#26101A", strokeWidth: 1.985, strokeLinecap: "round", strokeLinejoin: "round" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M616.857.671c1.844-.164 3.616-.027 5.315.411 2.549.658 6.209 2.3 6.815 2.876", stroke: "#26101A", strokeLinecap: "round", strokeWidth: 1.12 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { stroke: "#26101A", strokeLinejoin: "round", strokeWidth: 2.24 },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#A5597E", d: "m299.893 173.802 25.616-6.027 8.386 25.666-26.388 5.229z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#D06868", d: "m325.51 167.775 8.512-14.618 7.228 24.468-7.355 15.816z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#F59178", d: "m309.19 159.199 24.832-6.042-8.513 14.618-25.616 6.027z" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(3 -2224.575 7875.563)", stroke: "#26101A" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { strokeWidth: 2.24, fill: "#A5597E", strokeLinejoin: "round", d: "m41.478 1.553 82.536 1.033L85.23 23.393.254 21.983z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { strokeWidth: 2.24, fill: "#623578", strokeLinejoin: "round", d: "M.373 22.649 41.478 1.553l3.885 49.354L3.338 68.77z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { strokeWidth: 2.24, fill: "#65ADBB", cx: 70.398, cy: 20.156, r: 13.16 }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { strokeWidth: 2.24, fill: "#65ADBB", d: "m54.489 7.336.189 30.198L28.78 23.18z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { strokeWidth: 2.24, cx: 94.545, cy: 30.002, r: 22.12 }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { strokeWidth: 2.52, fill: "#623578", cx: 80.816, cy: 26.339, r: 13.16 }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { strokeLinejoin: "round" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { strokeWidth: 2.24, fill: "#A5597E", d: "m51.382 16.34 16.153 9.614-8.426 17.349-16.153-10.407z" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { strokeWidth: 1.985, fill: "#D06868", d: "m67.535 25.954 11.627-3.287-8.426 16.159-11.627 4.477z" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { strokeWidth: 2.24, fill: "#F59178", d: "m63.406 13.45 15.756 9.217-11.627 3.287-16.153-9.614z" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { strokeWidth: 2.24, fill: "#D06868", strokeLinejoin: "round", d: "M85.617 23.931 124.4 2.65l2.097 45.554L90.323 72.09z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { strokeWidth: 2.24, fill: "#F59178", strokeLinejoin: "round", d: "m.373 22.649 84.898 1.433 4.702 47.847L3.338 68.77z" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { stroke: "#26101A", strokeLinejoin: "round", strokeWidth: 1.985 },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#A5597E", d: "m184.767 165.037 16.153 9.613-8.427 17.35-16.153-10.407z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#D06868", d: "m200.92 174.65 11.627-3.287-8.427 16.159-11.627 4.477z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#F59178", d: "m196.79 162.147 15.757 9.216-11.627 3.287-16.153-9.613z" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#26101A", strokeWidth: 2.52, fill: "#623578", d: "m272.812 141.678 12.79 5.694-5.694 12.79-12.79-5.694z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { stroke: "#26101A", strokeWidth: 2.24, fill: "#D16F6F", cx: 175.56, cy: 189.56, r: 13.16 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { stroke: "#26101A", strokeWidth: 2.268, cx: 237.72, cy: 162.12, r: 22.12 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { stroke: "#26101A", strokeWidth: 2.24, fill: "#623578", cx: 196.28, cy: 195.16, r: 13.16 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { stroke: "#26101A", strokeLinejoin: "round", strokeWidth: 1.985 },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#A5597E", d: "m297.887 132.557 16.153 9.613-8.427 17.349-16.153-10.407z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#D06868", d: "m314.04 142.17 11.627-3.287-8.427 16.159-11.627 4.477z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#F59178", d: "m309.91 129.667 15.757 9.216-11.627 3.287-16.153-9.613z" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#26101A", strokeWidth: 2.24, fill: "#5DA7B5", d: "m214.795 145.758 30.887 25.917-25.917 30.887-30.887-25.917z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { stroke: "#26101A", strokeWidth: 2.261, cx: 262.92, cy: 154.84, r: 38.36 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { stroke: "#26101A" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M487.927 79.605c6.644-5.175 17.066-2.944 23.28 4.984 6.212 7.927 5.862 18.55-.782 23.724-6.644 5.175-17.067 2.944-23.28-4.984-6.212-7.927-5.863-18.55.782-23.724zm1.616 3.422c-4.728 3.682-4.812 12.229-.015 18.35 4.798 6.122 12.66 7.5 17.387 3.817 4.727-3.682 4.67-11.63-.126-17.75-4.798-6.122-12.519-8.1-17.246-4.417z", strokeWidth: 2.24, fill: "#F59178" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M509.938 106.294a2.82 2.82 0 0 1 3.893.493l2.184 2.727c-.85 1.03-1.039 1.92-.567 2.668.472.749 1.675 1.468 3.609 2.156l3.52 4.565a2.09 2.09 0 0 1-.371 2.924 2.145 2.145 0 0 1-2.968-.322l-6.41-7.726-2.203-2.654-1.046-1.163a2.498 2.498 0 0 1 .36-3.668z", strokeWidth: 2.24, fill: "#A5597E", strokeLinejoin: "round" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M489.387 92.386c.94 1.825 2.25 3.304 3.861 4.632 2.924 2.41 6.146 3.757 10.731 3.393a18.76 18.76 0 0 0 1.343-.155c-.124.615-.344 1.122-.587 1.472-.459.66-1.474 1.439-2.903 1.766-1.005.23-2.216.242-3.553-.18-1.889-.598-4.07-2.078-6.251-5.162-1.554-2.198-2.341-4.124-2.64-5.766z", strokeWidth: 1.68, fill: "#C3E5D7", strokeLinejoin: "round" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#26101A", strokeWidth: 2.24, fill: "#D16F6F", d: "m303.282 141.603 17.675 36.24-36.24 17.674-17.674-36.24z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { stroke: "#26101A", strokeWidth: 2.24, fill: "#65ADBB", cx: 265.64, cy: 163.192, r: 13.16 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { stroke: "#26101A", strokeWidth: 2.24, fill: "#65ADBB", cx: 429.8, cy: 196.84, r: 13.16 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#26101A", strokeWidth: 2.24, fill: "#D16F6F", d: "m204.006 174.607 39.707-7.001 7.001 39.707-39.707 7.001z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { stroke: "#26101A", strokeWidth: 2.24, fill: "#623578", cx: 280, cy: 184.8, r: 16.24 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#26101A", strokeWidth: 2.52, fill: "#65ADBB", d: "m287.167 108.523-1.654 30.309-25.361-16.47zm47.6 71.12-1.654 30.309-25.361-16.47z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { stroke: "#26101A", strokeWidth: 2.24, fill: "#65ADBB", cx: 296.52, cy: 192.36, r: 13.16 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#26101A", strokeWidth: 2.52, fill: "#623578", d: "m245.36 159.6 20.56.23-10.08 17.46z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { stroke: "#26101A", strokeLinejoin: "round", strokeWidth: 1.985 },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#A5597E", d: "m232.927 166.157 16.153 9.613-8.427 17.349-16.153-10.407z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#D06868", d: "m249.08 175.77 11.627-3.287-8.427 16.159-11.627 4.477z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#F59178", d: "m244.95 163.267 15.757 9.216-11.627 3.287-16.153-9.613z" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { stroke: "#26101A", strokeWidth: 2.24, fill: "#623578", cx: 311.08, cy: 199.64, r: 13.16 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { stroke: "#26101A", strokeWidth: 2.24, fill: "#65ADBB", cx: 250.88, cy: 198.24, r: 16.8 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { stroke: "#26101A", strokeLinejoin: "round", strokeWidth: 2.24 },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#A5597E", d: "m261.962 196.564 26.226 2.183.044 27.002-26.713-3.182z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#D06868", d: "m288.188 198.747 12.613-11.27-.686 25.503-11.883 12.769z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#F59178", d: "m275.318 185.548 25.483 1.928-12.613 11.271-26.226-2.183z" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#26101A", strokeWidth: 2.24, fill: "#623578", d: "M142.52 208.32 154 228.48h-22.96z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M607.04 74.706c1.237 0 2.24-1.12 2.24-2.501 0-.921-.747-2.7-2.24-5.34-1.493 2.64-2.24 4.419-2.24 5.34 0 1.381 1.003 2.5 2.24 2.5zm-5.6-11.2c1.237 0 2.24-1.12 2.24-2.501 0-.921-.747-2.7-2.24-5.34-1.493 2.64-2.24 4.419-2.24 5.34 0 1.381 1.003 2.5 2.24 2.5z", stroke: "#26101A", strokeWidth: 1.4, fill: "#C3E5D7" }))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgGenericError);


/***/ }),

/***/ "./lib/utils/components/Svgs/KubernetesElephant.js":
/*!*********************************************************!*\
  !*** ./lib/utils/components/Svgs/KubernetesElephant.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const SvgKubernetesElephant = (props) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", viewBox: "170 0 400 400" }, props),
    react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null,
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-30.4%", y: "-22.5%", width: "154.9%", height: "143.2%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__a" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 4.133, in: "SourceGraphic" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-33.4%", y: "-25.3%", width: "160.8%", height: "148.8%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__b" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: -3, dy: -1, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0.364705882 0 0 0 0 0.654901961 0 0 0 0 0.709803922 0 0 0 1 0", in: "shadowOffsetOuter1" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-4.3%", y: "-11.8%", width: "108.5%", height: "127.5%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__d" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 3.307, in: "SourceGraphic" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-5.4%", y: "-13.7%", width: "110.7%", height: "131.3%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__e" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dy: 3, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0.364705882 0 0 0 0 0.654901961 0 0 0 0 0.709803922 0 0 0 1 0", in: "shadowOffsetOuter1" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "1.9%", y: "-1.1%", width: "96.1%", height: "106%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__g" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dy: 3, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0.364705882 0 0 0 0 0.654901961 0 0 0 0 0.709803922 0 0 0 1 0", in: "shadowOffsetOuter1" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-8.9%", y: "-1.1%", width: "111.8%", height: "101.4%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__i" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: -3, dy: -1, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0.364705882 0 0 0 0 0.654901961 0 0 0 0 0.709803922 0 0 0 1 0", in: "shadowOffsetOuter1" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-17.7%", y: "-11.8%", width: "127.5%", height: "127.9%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__k" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: -2, dy: -1, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0.364705882 0 0 0 0 0.654901961 0 0 0 0 0.709803922 0 0 0 1 0", in: "shadowOffsetOuter1", result: "shadowMatrixOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: -2, dy: 1, in: "SourceAlpha", result: "shadowOffsetOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 2, in: "shadowOffsetOuter2", result: "shadowBlurOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0", in: "shadowBlurOuter2", result: "shadowMatrixOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMerge", null,
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMergeNode", { in: "shadowMatrixOuter1" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMergeNode", { in: "shadowMatrixOuter2" }))),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-17.7%", y: "-11.8%", width: "127.5%", height: "127.9%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__m" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: -2, dy: -1, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0.364705882 0 0 0 0 0.654901961 0 0 0 0 0.709803922 0 0 0 1 0", in: "shadowOffsetOuter1", result: "shadowMatrixOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: -2, dy: 1, in: "SourceAlpha", result: "shadowOffsetOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 2, in: "shadowOffsetOuter2", result: "shadowBlurOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0", in: "shadowBlurOuter2", result: "shadowMatrixOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMerge", null,
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMergeNode", { in: "shadowMatrixOuter1" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMergeNode", { in: "shadowMatrixOuter2" }))),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-17.7%", y: "-11.8%", width: "127.5%", height: "127.9%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__o" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: -2, dy: -1, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0.364705882 0 0 0 0 0.654901961 0 0 0 0 0.709803922 0 0 0 1 0", in: "shadowOffsetOuter1", result: "shadowMatrixOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: -2, dy: 1, in: "SourceAlpha", result: "shadowOffsetOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 2, in: "shadowOffsetOuter2", result: "shadowBlurOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0", in: "shadowBlurOuter2", result: "shadowMatrixOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMerge", null,
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMergeNode", { in: "shadowMatrixOuter1" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMergeNode", { in: "shadowMatrixOuter2" }))),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-8.3%", y: "-7.4%", width: "133.3%", height: "125.7%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__q" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: 3, dy: -1, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0.364705882 0 0 0 0 0.654901961 0 0 0 0 0.709803922 0 0 0 1 0", in: "shadowOffsetOuter1", result: "shadowMatrixOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: 3, dy: 3, in: "SourceAlpha", result: "shadowOffsetOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 1.5, in: "shadowOffsetOuter2", result: "shadowBlurOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0", in: "shadowBlurOuter2", result: "shadowMatrixOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMerge", null,
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMergeNode", { in: "shadowMatrixOuter1" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMergeNode", { in: "shadowMatrixOuter2" }))),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-15.4%", y: "-39.1%", width: "130.7%", height: "178.2%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__t" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 4.133, in: "SourceGraphic" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-4.2%", y: "-7.3%", width: "108.5%", height: "114.5%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__u" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 0.413, in: "SourceGraphic" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-8.7%", y: "-11.4%", width: "117.5%", height: "122.8%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__v" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 0.413, in: "SourceGraphic" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-8.7%", y: "-11.4%", width: "117.5%", height: "122.8%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__w" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 0.413, in: "SourceGraphic" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-5.4%", y: "-11.1%", width: "110.9%", height: "122.1%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__y" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 0.413, in: "SourceGraphic" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-33.8%", y: "-19.6%", width: "167.6%", height: "151.9%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__F" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dy: 5, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 6, in: "shadowOffsetOuter1", result: "shadowBlurOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.272180944 0", in: "shadowBlurOuter1" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-4.3%", y: "-11.8%", width: "108.5%", height: "127.5%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__L" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 3.307, in: "SourceGraphic" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-5.4%", y: "-13.7%", width: "110.7%", height: "131.3%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__M" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dy: 3, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0.364705882 0 0 0 0 0.654901961 0 0 0 0 0.709803922 0 0 0 1 0", in: "shadowOffsetOuter1" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "1.9%", y: "-1.1%", width: "96.1%", height: "106%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__O" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dy: 3, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0.364705882 0 0 0 0 0.654901961 0 0 0 0 0.709803922 0 0 0 1 0", in: "shadowOffsetOuter1" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-8.3%", y: "-7.4%", width: "133.3%", height: "125.7%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__Q" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: 3, dy: -1, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0.364705882 0 0 0 0 0.654901961 0 0 0 0 0.709803922 0 0 0 1 0", in: "shadowOffsetOuter1", result: "shadowMatrixOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: 3, dy: 3, in: "SourceAlpha", result: "shadowOffsetOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 1.5, in: "shadowOffsetOuter2", result: "shadowBlurOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0", in: "shadowBlurOuter2", result: "shadowMatrixOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMerge", null,
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMergeNode", { in: "shadowMatrixOuter1" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMergeNode", { in: "shadowMatrixOuter2" }))),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-16.9%", y: "-13.2%", width: "167.4%", height: "145.9%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__S" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: 3, dy: -1, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0.364705882 0 0 0 0 0.654901961 0 0 0 0 0.709803922 0 0 0 1 0", in: "shadowOffsetOuter1", result: "shadowMatrixOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: 3, dy: 3, in: "SourceAlpha", result: "shadowOffsetOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 1.5, in: "shadowOffsetOuter2", result: "shadowBlurOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0", in: "shadowBlurOuter2", result: "shadowMatrixOuter2" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMerge", null,
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMergeNode", { in: "shadowMatrixOuter1" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMergeNode", { in: "shadowMatrixOuter2" }))),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-17%", y: "-23.7%", width: "124.1%", height: "150%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__X" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 4.133, in: "SourceGraphic" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-19.6%", y: "-30.4%", width: "139.2%", height: "160.7%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__Z" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 2.067, in: "SourceGraphic" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-19.6%", y: "-30.4%", width: "139.2%", height: "160.7%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__ad" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 2.067, in: "SourceGraphic" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-19.6%", y: "-30.4%", width: "139.2%", height: "160.7%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__ag" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 2.067, in: "SourceGraphic" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-19.6%", y: "-30.4%", width: "139.2%", height: "160.7%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__aj" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { stdDeviation: 2.067, in: "SourceGraphic" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-4.4%", y: "-6.3%", width: "105.9%", height: "108.4%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__al" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: -2, dy: -2, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0.364705882 0 0 0 0 0.654901961 0 0 0 0 0.709803922 0 0 0 1 0", in: "shadowOffsetOuter1" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { x: "-16.1%", y: "-24.2%", width: "124.2%", height: "132.3%", filterUnits: "objectBoundingBox", id: "kubernetesElephant_svg__an" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { dx: -1, dy: -2, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { values: "0 0 0 0 0.647058824 0 0 0 0 0.349019608 0 0 0 0 0.494117647 0 0 0 1 0", in: "shadowOffsetOuter1" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M.207 51.319V31.253c0-1.18.628-2.27 1.648-2.861L48.36 1.439a1.653 1.653 0 0 1 2.482 1.43v20.826a3.307 3.307 0 0 1-1.684 2.88L2.671 52.76a1.653 1.653 0 0 1-2.464-1.441z", id: "kubernetesElephant_svg__c" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m6.176 46.42 42.177-24.545a4.133 4.133 0 0 1 4.152-.004l77.284 44.803a4.133 4.133 0 0 1-.016 7.161L87.621 98.021a4.133 4.133 0 0 1-4.117-.002L6.195 53.576a4.133 4.133 0 0 1-.019-7.156z", id: "kubernetesElephant_svg__f" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M6.176 25.753 48.353 1.208a4.133 4.133 0 0 1 4.152-.004l77.284 44.803a4.133 4.133 0 0 1-.016 7.16L87.621 77.355a4.133 4.133 0 0 1-4.117-.002L6.195 32.909a4.133 4.133 0 0 1-.019-7.156z", id: "kubernetesElephant_svg__h" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M7.854 109.187V31.253c0-1.18.628-2.27 1.648-2.861L56.006 1.439a1.653 1.653 0 0 1 2.482 1.43v78.694a3.307 3.307 0 0 1-1.684 2.88l-46.486 26.185a1.653 1.653 0 0 1-2.464-1.44z", id: "kubernetesElephant_svg__j" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M0 30.302v14.147a.827.827 0 0 0 1.24.716l48.774-28.154c.512-.295.827-.841.827-1.432V1.432a.827.827 0 0 0-1.24-.716L.827 28.87A1.653 1.653 0 0 0 0 30.302z", id: "kubernetesElephant_svg__l" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M0 30.302v14.147a.827.827 0 0 0 1.24.716l48.774-28.154c.512-.295.827-.841.827-1.432V1.432a.827.827 0 0 0-1.24-.716L.827 28.87A1.653 1.653 0 0 0 0 30.302z", id: "kubernetesElephant_svg__n" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M0 30.302v14.147a.827.827 0 0 0 1.24.716l48.774-28.154c.512-.295.827-.841.827-1.432V1.432a.827.827 0 0 0-1.24-.716L.827 28.87A1.653 1.653 0 0 0 0 30.302z", id: "kubernetesElephant_svg__p" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M0 24.257V1.433A.827.827 0 0 1 1.24.717l33.696 19.477c.507.293.821.833.826 1.418l.187 22.827a.827.827 0 0 1-1.239.723L.83 25.691A1.653 1.653 0 0 1 0 24.257z", id: "kubernetesElephant_svg__r" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { id: "kubernetesElephant_svg__x", d: "M0 8.72 14.994 0l14.269 8.564L14.37 17.13z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M50.36 122.927c-1.767 8.562-2.651 14.221-2.651 16.977 0 1.611 4.962 10.058 5.666 11.672 1.101 2.525 2.906 3.468-1.667 5.256-5.548 2.171-10.958 2.718-10.958-1.828 0-4.547-7.808-7.356-6.17-15.1.755-3.575 2.042-15.884 1.67-20.134-.115-1.321 4.106-1.529 12.663-.624l1.448 3.78z", id: "kubernetesElephant_svg__A" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M23.1 0c3.958 1.65 7.745 2.179 11.36 1.585 1.477-.242 3.373-.79 5.452-1.172 2.143-.393 5.603.09 7.197 0 10.788-.607 23.499 1.653 32.694 7.44 9.195 5.788 7.412 10.69 7.826 14.901.413 4.212.699 9.937-3.805 14.84-1.414 1.539-.719 4.236-2.965 9.3-2.246 5.063-.786 8.663-1.056 12.165-.199 2.567 2.868 4.01 0 6.349-3.379 2.754-9.372 2.754-12.221 0-.974-.941.346-2.58 0-3.904-.912-3.484-2.801-7.352-2.801-11.593v-4.947c-5.317 1.387-9.95 1.658-13.899.814s-6.856-1.889-8.721-3.134l-4.547 5.614-.36.103c4.048 1.18 5.242 3.836 3.582 7.97-2.488 6.2-4.443 5.638-7.942 4.43-3.284-1.133-8.463-4.332-8.862-6.035-.822-3.517-4.192-3.936-3.365-8.121.247-1.252 1.94-4.767 5.08-10.544-2.86-.36-4.962-.807-6.303-1.34-1.341-.533-3.138-1.636-5.39-3.308L0 30.026 23.1 0z", id: "kubernetesElephant_svg__C" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M0-37.614c-1.02 2.341 3.72 9.498 1.065 14.91C-1.59-17.292-9.094-16.12-12.4-8.654c-3.307 7.466-3.307 13.08 0 21.25 3.306 8.17 3.926 9.415 12.4 14.617 1.4.86-1.218 2.248 0 2.83 3.322 1.586 7.958 1.188 11.574 1.272 3.084.072 5.216.726 7.44.726 3.858 0 7.222-1.174 10.093-3.52.433 6.613 2.029 9.92 4.787 9.92 2.341 0 .905-8.362 4.134-11.228 4.133-3.67 9.026-9.787 7.41-16.053-2.19-8.497-7.564-6.652-11.544-7.85-2.779-.835-4.79-4.464-9.093-5.534-2.905-.722-1.658-2.323-4.96-1.91-4.846.607-11.105 4.74-18.776 12.4-4.655-4.558-6.112-8.691-4.372-12.4 2.61-5.562 9.92-8.68 12.19-15.732 2.268-7.053.609-18.288 0-20.09-.61-1.8-2.876.814-5.163 1.361-2.287.548-2.7-1.36-3.72.98z", id: "kubernetesElephant_svg__G" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M16.67 3.182c-1.02 2.341 2.067 11.825-.588 17.237-2.655 5.412-10.159 6.583-13.465 14.05-3.307 7.465-3.307 13.079 0 21.25 3.306 8.17 4.803 11.129 14.349 14.941 0 0-4.068 1.397-1.95 2.505 3.286 1.718 7.96 1.19 11.575 1.273 3.084.071 5.216.725 7.44.725 3.858 0 7.222-1.173 10.093-3.52.433 6.614 2.029 9.92 4.787 9.92 2.341 0 .905-8.361 4.134-11.227 4.133-3.67 9.026-9.787 7.41-16.053-2.19-8.497-7.564-6.653-11.544-7.85-2.779-.835-4.79-4.464-9.093-5.534-2.905-.723-9.094-2.178-13.612 1.397-4.517 3.575-5.285 6.605-7.469 9.682-.26.366-1.145.17-2.655-.588-4.655-4.56-6.112-8.692-4.372-12.4 2.61-5.563 9.92-8.68 12.19-15.734 2.268-7.052.406-20.528-.203-22.329-.609-1.8-1.02.727-3.307 1.275-2.287.547-2.7-1.361-3.72.98z", id: "kubernetesElephant_svg__H" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m6.176 46.42 42.177-24.545a4.133 4.133 0 0 1 4.152-.004l77.284 44.803a4.133 4.133 0 0 1-.016 7.161L87.621 98.021a4.133 4.133 0 0 1-4.117-.002L6.195 53.576a4.133 4.133 0 0 1-.019-7.156z", id: "kubernetesElephant_svg__N" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M6.176 25.753 48.353 1.208a4.133 4.133 0 0 1 4.152-.004l77.284 44.803a4.133 4.133 0 0 1-.016 7.16L87.621 77.355a4.133 4.133 0 0 1-4.117-.002L6.195 32.909a4.133 4.133 0 0 1-.019-7.156z", id: "kubernetesElephant_svg__P" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M0 24.257V1.433A.827.827 0 0 1 1.24.717l33.696 19.477c.507.293.821.833.826 1.418l.187 22.827a.827.827 0 0 1-1.239.723L.83 25.691A1.653 1.653 0 0 1 0 24.257z", id: "kubernetesElephant_svg__R" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M12.4 14.342V1.445a.827.827 0 0 1 1.246-.712l15.519 9.129c.498.293.807.824.815 1.402l.174 12.904a.827.827 0 0 1-1.242.726l-15.69-9.122a1.653 1.653 0 0 1-.822-1.43z", id: "kubernetesElephant_svg__T" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { id: "kubernetesElephant_svg__V", d: "M.008.169h6.496v6.444H.008z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M.207 12.414 13.793 2.98a8.267 8.267 0 0 1 8.828-.38l41.443 23.775a5.373 5.373 0 0 1 .022 9.308L45.085 46.708 0 20.468l.207-8.054z", id: "kubernetesElephant_svg__Y" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M.207 12.414 13.793 2.98a8.267 8.267 0 0 1 8.828-.38l41.443 23.775a5.373 5.373 0 0 1 .022 9.308L45.085 46.708 0 20.468l.207-8.054z", id: "kubernetesElephant_svg__ac" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M.207 12.414 13.793 2.98a8.267 8.267 0 0 1 8.828-.38l41.443 23.775a5.373 5.373 0 0 1 .022 9.308L45.085 46.708 0 20.468l.207-8.054z", id: "kubernetesElephant_svg__af" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M.207 12.414 13.793 2.98a8.267 8.267 0 0 1 8.828-.38l41.443 23.775a5.373 5.373 0 0 1 .022 9.308L45.085 46.708 0 20.468l.207-8.054z", id: "kubernetesElephant_svg__ai" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M3.72 47.948 66.135 11.92C70.993 7.836 67.147 1.24 60.462.413c-4.457-.55-7.857.598-10.2 3.447C45.315.418 39.985 0 34.271 2.6c-5.715 2.603-9.946 8.013-12.696 16.232A24.725 24.725 0 0 0 2.582 33.949c-3.74 9.215-3.36 13.881 1.138 13.999z", id: "kubernetesElephant_svg__am" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M14.993 5.56a.346.346 0 0 0-.564-.112l-1.375 1.375a.82.82 0 0 1-.589.228c-.319 0-.647-.146-.905-.403l-.028-.027c-.458-.459-.534-1.128-.17-1.492l1.374-1.374a.346.346 0 0 0-.112-.564 3.737 3.737 0 0 0-1.443-.298c-.82 0-1.57.298-2.111.84l-.915.913c-.902.904-1.088 2.336-.501 3.648-.038.03-.073.06-.106.094l-4.287 4.288a1.285 1.285 0 0 0-.368.918c.001.422.185.848.498 1.16l.033.035c.321.32.747.505 1.169.505.354 0 .68-.13.917-.368l4.288-4.288a1.33 1.33 0 0 0 .093-.106c.495.222 1.02.337 1.534.337.82 0 1.57-.298 2.113-.84l.912-.913c.882-.881 1.09-2.244.543-3.556z", id: "kubernetesElephant_svg__ao" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", { x1: "50%", y1: "0%", x2: "50%", y2: "100%", id: "kubernetesElephant_svg__s" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { stopColor: "#E9F3F5", offset: "0%" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { stopColor: "#FFF", offset: "100%" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", { x1: "50%", y1: "0%", x2: "50%", y2: "100%", id: "kubernetesElephant_svg__B" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { stopColor: "#462656", offset: "0%" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { stopColor: "#4B2357", offset: "100%" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", { x1: "24.16%", y1: "41.105%", x2: "90.785%", y2: "74.515%", id: "kubernetesElephant_svg__D" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { stopColor: "#4C5D7F", offset: "0%" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { stopColor: "#4C436D", offset: "100%" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", { x1: "39.375%", y1: "2.991%", x2: "59.669%", y2: "84.383%", id: "kubernetesElephant_svg__I" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { stopColor: "#518EA3", offset: "0%" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { stopColor: "#4E6687", offset: "100%" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", { x1: "81.044%", y1: "47.272%", x2: "-7.76%", y2: "70.031%", id: "kubernetesElephant_svg__K" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { stopColor: "#EFE8CD", offset: "0%" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { stopColor: "#D3CAAF", offset: "100%" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", { x1: "50%", y1: "0%", x2: "50%", y2: "100%", id: "kubernetesElephant_svg__U" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { stopColor: "#E9F3F5", offset: "0%" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { stopColor: "#FFF", offset: "100%" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", { x1: "50%", y1: "0%", x2: "50%", y2: "100%", id: "kubernetesElephant_svg__ab" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { stopColor: "#E9F3F5", offset: "0%" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { stopColor: "#FFF", offset: "100%" }))),
    react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { fill: "none", fillRule: "evenodd" },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M312.065 322.918 179.4 246.617a4.133 4.133 0 0 1-.011-7.16l206.689-119.683a8.267 8.267 0 0 1 8.248-.021l132.665 75.918a4.133 4.133 0 0 1 .023 7.161L320.339 322.9a8.267 8.267 0 0 1-8.274.018z", fill: "#5DA7B5", opacity: 0.136 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { fillRule: "nonzero" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M324.08 297.25a2.39 2.39 0 0 0-1.046-.068l-6.587 1.21a1.22 1.22 0 0 0-.426.162c-.11.066-.234.14-.312.225l-1.8 3.848c-.092.187-.03.396.192.582l4.342 3.584c.237.178.57.298.936.342l7.171.604c.362.009.726-.06.977-.191l4.629-2.782c.28-.13.384-.343.29-.57l-1.358-4.097c-.09-.209-.313-.395-.619-.532l-6.39-2.316z", fill: "#C9E5EB" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M328.414 300.379c-.016-.01-.044.007-.072.024-.071.024-.127.058-.182.091a.271.271 0 0 1-.1.041l-.013.009a4.377 4.377 0 0 1-.569.23.435.435 0 0 1-.21-.005l-.143.05c-.414-.293-.927-.543-1.479-.752a9.534 9.534 0 0 0-1.81-.44l-.014-.103-.017-.009c-.048-.026-.099-.07-.103-.105a1.237 1.237 0 0 1 .064-.411l.035-.077c.023-.051.033-.094.056-.145-.003-.017.011-.026.009-.043-.002-.017-.016-.009-.032-.018.011-.137-.155-.26-.398-.283a.569.569 0 0 0-.307.055.22.22 0 0 0-.113.16l.002.018c.002.017.005.034-.01.043a.495.495 0 0 0 .035.147c.019.026.007.051.01.069a.92.92 0 0 1 .009.404c-.012.026-.024.051-.051.068a.14.14 0 0 1-.072.024l-.014.009-.03.11c-.24-.004-.494 0-.735-.005-.981.05-1.91.273-2.643.62l-.143-.063.016.009a.498.498 0 0 1-.199-.03 4.49 4.49 0 0 1-.521-.32l-.017-.009c-.032-.017-.05-.044-.083-.061-.05-.044-.115-.08-.166-.124l-.097-.053a.678.678 0 0 0-.575-.046c-.1.041-.134.118-.123.204.01.069.062.13.143.175l.081.044c.065.036.143.063.222.09a.37.37 0 0 1 .11.046l.017.009c.205.081.383.18.577.286.035.035.07.07.06.113l.033.018.115.08c-.136.1-.256.21-.39.327-.49.481-.683 1.062-.574 1.65l-.148.013-.014.009c-.014.008-.012.025-.04.042a.37.37 0 0 1-.115.032 6.746 6.746 0 0 1-.718.003c-.047-.009-.09-.001-.12-.002-.09-.002-.167-.012-.257-.013-.03-.001-.044.007-.074.007h-.03a.636.636 0 0 0-.275.071c-.083.05-.12.11-.08.18.061.13.283.22.507.216.014-.009.03 0 .03 0s.06.001.074-.007c.074-.007.162-.023.25-.038l.132-.023c.235-.03.47-.06.711-.055.06 0 .153.02.187.055l-.016-.01.18.004c.019.026.021.044.04.07.362.695 1.12 1.32 2.166 1.753l-.079.085c.016.009.002.017.002.017.035.035.026.078.016.12a2.23 2.23 0 0 1-.374.337c-.028.017-.055.034-.067.06-.056.033-.095.075-.15.108-.014.009-.012.026-.04.042-.013.009-.013.009-.011.026-.12.11-.056.257.15.338.173.064.395.042.503-.042.028-.016.042-.025.054-.05.014-.008.014-.008-.003-.017-.016-.01.042-.025.056-.034.04-.042.062-.093.088-.127a.134.134 0 0 1 .05-.068l.014-.008c.088-.127.178-.237.312-.355l.014-.009a.306.306 0 0 1 .16-.04c.014-.008.03.001.03.001l.108-.084a8.951 8.951 0 0 0 3.03.36c.237-.013.445-.026.664-.065l.044.104c.016.01.03 0 .03 0a.322.322 0 0 1 .176.082c.106.122.185.261.247.392l.016.008c.018.027.02.044.025.078.005.035.042.087.065.148.002.017.018.026.02.043 0 0 .017.01.003.017.092.131.342.205.548.174a.46.46 0 0 0 .129-.04c.11-.067.127-.17.07-.265 0 0-.017-.01-.003-.018-.016-.008-.018-.026-.02-.043-.051-.044-.072-.087-.123-.131l-.07-.07a2.168 2.168 0 0 1-.32-.385.113.113 0 0 1 .014-.12c.014-.009.014-.009-.003-.017l-.074-.105a5.132 5.132 0 0 0 1.466-.582 2.6 2.6 0 0 0 .635-.513c.12-.11.208-.236.298-.347l.169.03c.014-.009.014-.009.03 0a.534.534 0 0 1 .208-.013c.231.047.462.095.681.168l.017.009.124.037c.079.027.157.054.234.064.03.001.046.01.076.01 0 0 .016.01.03.001.169.03.346.015.457-.051.042-.025.053-.05.079-.085.023-.05.014-.12-.053-.173a.671.671 0 0 0-.256-.125c-.017-.01-.03 0-.03 0a.195.195 0 0 0-.077-.01 1.346 1.346 0 0 0-.258-.032c-.047-.01-.077-.01-.137-.01l-.032-.019a4.34 4.34 0 0 1-.69-.125c-.063-.018-.128-.054-.149-.097-.016-.01-.002-.018-.002-.018l-.17-.046c.205-.701-.03-1.454-.702-2.112l.127-.058c.014-.008-.002-.017-.002-.017-.005-.034.02-.068.062-.093l.014-.009a4.32 4.32 0 0 1 .59-.186l.013-.008a.403.403 0 0 0 .116-.032c.087-.016.161-.023.233-.048.014-.008.044-.007.072-.024.014-.008.014-.008.044-.008a.199.199 0 0 0 .085-.032c.125-.075.139-.196.051-.292a.83.83 0 0 0-.59-.037c-.013.008-.027.017-.043.008zm-4.629 2.464-.584.11-.566-.2-.125-.373.416-.25.652.056.371.316-.164.341zm2.448-1.75-1.754.551a.547.547 0 0 1-.49-.078c-.034-.035-.053-.061-.058-.096l-.059-1.23c.444.068.878.18 1.287.325.409.146.762.324 1.074.528zm-3.574.266c-.033.094-.188.169-.37.148a.311.311 0 0 1-.155-.037l-1.716-.85c.69-.323 1.539-.478 2.44-.46l-.2 1.2zm-3.135-.146.212-.203 1.548.933c.145.08.147.21.023.285-.042.025-.086.032-.144.049l-2.104.165c-.044-.44.109-.866.465-1.23zm1.824 1.772c.194-.005.37.076.4.189.02.043.009.069-.03.11l-.893 1.059c-.72-.35-1.277-.816-1.57-1.33l2.093-.028zm1.501.7a.53.53 0 0 1 .446-.026c.062.019.127.054.148.098l.96 1.136a7.293 7.293 0 0 1-2.652-.231l1.098-.977zm3.54.593a4.745 4.745 0 0 1-1.036.436l-.76-1.201c-.027-.096.051-.18.213-.203.074-.007.134-.006.224-.004l2.072.376a1.844 1.844 0 0 0-.198.193 2.7 2.7 0 0 1-.516.403zm.8-2.194c.18.338.228.7.138 1.034l-2.06-.513c-.158-.054-.232-.159-.183-.244.025-.034.05-.068.092-.093l1.662-.681c.157.166.284.332.35.497z", fill: "#FFF" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M386.131 267.798c.048-.1-.026-.22-.182-.292a.895.895 0 0 0-.571-.066 6.45 6.45 0 0 0-1.028.202c-.331.085-.65.144-.956.196-.275.052-.555.07-.866.07a3.633 3.633 0 0 1-1.7-.476c-.537-.285-.836-.69-.793-1.08.042-.405.382-.786 1.02-1.16a5.957 5.957 0 0 1 1.04-.481c.284-.112.583-.214.914-.299l1.084.91c-.273.07-.5.148-.758.226a3.966 3.966 0 0 0-.76.353c-.471.276-.564.494-.263.663.064.036.14.063.218.09.091.02.18.022.283.016.104-.006.234-.028.395-.049.16-.021.363-.067.592-.129.389-.1.809-.182 1.217-.24a3.92 3.92 0 0 1 .943-.043c.268.007.526.056.787.14.278.091.527.2.75.324.566.285.867.709.766 1.113-.087.396-.483.81-1.204 1.231a5.938 5.938 0 0 1-1.322.61 15.83 15.83 0 0 1-.86.25l-1.146-.929a9 9 0 0 0 1.047-.303c.293-.154.588-.29.866-.452m-10.574 2.591a1.756 1.756 0 0 1-.447-.901 1.115 1.115 0 0 1 .202-.809c.163-.258.419-.48.738-.667.749-.439 1.615-.637 2.568-.595.953.042 1.952.347 2.967.916.095.053.206.115.319.195.127.07.208.132.303.185l-3.385 1.98c.361.171.83.26 1.27.22.528-.054 1-.203 1.344-.423a5.36 5.36 0 0 0 .726-.515 1.89 1.89 0 0 0 .414-.515l1.603.66c-.034.093-.113.175-.176.267-.105.116-.21.232-.347.33-.135.115-.27.23-.432.362a8.111 8.111 0 0 1-.537.35c-.414.26-.91.46-1.486.598-.476.114-.99.16-1.524.147a6.376 6.376 0 0 1-1.512-.26 8.993 8.993 0 0 1-1.421-.621m2.362-2.617a2.27 2.27 0 0 0-.532-.107 2.417 2.417 0 0 0-.56.019c-.218.037-.389.1-.541.19-.153.089-.26.188-.32.313a.473.473 0 0 0-.05.321c.027.11.084.223.185.327.102.104.216.2.345.288l1.97-1.152m-10.277 1.2 1.776.996 1.803-1.056 1.427.8-1.803 1.055 2.124 1.19a2.99 2.99 0 0 0 1.023.383c.317.05.65-.017.997-.22.166-.097.317-.203.438-.31a1.96 1.96 0 0 0 .329-.356l1.54.624a3.15 3.15 0 0 1-.389.482c-.2.19-.446.37-.723.532a3.85 3.85 0 0 1-1.203.486c-.36.084-.773.107-1.161.08a4.94 4.94 0 0 1-1.172-.26 6.738 6.738 0 0 1-1.145-.546l-5.09-2.852m-2.666 5.211a1.756 1.756 0 0 1-.446-.901 1.115 1.115 0 0 1 .202-.808c.162-.259.418-.481.737-.668.749-.438 1.615-.636 2.568-.595.953.042 1.952.347 2.967.916.095.053.206.116.319.195.113.079.208.132.303.186l-3.398 1.988c.36.17.83.26 1.27.22.527-.055.999-.203 1.344-.423a5.36 5.36 0 0 0 .725-.516c.174-.156.317-.33.428-.522l1.603.66c-.033.092-.113.175-.176.266-.105.116-.21.232-.347.33-.135.116-.27.23-.432.362a8.111 8.111 0 0 1-.537.35c-.414.261-.91.46-1.486.598-.476.115-.989.16-1.524.147a6.376 6.376 0 0 1-1.512-.26 6.967 6.967 0 0 1-1.421-.62m2.362-2.618c-.17-.064-.351-.085-.531-.107a2.417 2.417 0 0 0-.561.02c-.218.036-.389.1-.541.189-.153.089-.26.188-.32.314a.449.449 0 0 0-.037.312.709.709 0 0 0 .187.327c.1.104.216.2.344.289l1.956-1.145m-10.669 3.428a8.032 8.032 0 0 1 1.151-.8c.359-.229.813-.403 1.316-.535.389-.1.828-.14 1.262-.102.434.036.86.132 1.247.27a7.68 7.68 0 0 1 1.237.565l3.409 1.91-1.485.869-3.186-1.786c-.555-.311-1.005-.484-1.368-.544a1.602 1.602 0 0 0-1.056.218c-.111.065-.222.13-.331.212a2.137 2.137 0 0 0-.287.205l4.661 2.612-1.498.877-5.819-3.261m-.32 1.568a3.835 3.835 0 0 0-.647.305c-.11.065-.206.139-.315.22-.081.067-.162.132-.228.207l4.614 2.586-1.498.876-5.74-3.216c.179-.25.403-.49.643-.721.29-.298.66-.568 1.077-.794.098-.057.21-.105.308-.162.11-.065.237-.12.394-.176.127-.056.254-.112.41-.168.113-.047.242-.087.387-.117l1.177.946m-8.94 5.414a1.756 1.756 0 0 1-.447-.902 1.115 1.115 0 0 1 .202-.808c.163-.259.418-.481.737-.668.75-.438 1.615-.636 2.568-.594.954.041 1.953.347 2.951.906.096.054.207.116.32.195.112.08.208.133.303.186l-3.399 1.989c.361.17.83.258 1.27.219.528-.054 1-.203 1.344-.423a5.36 5.36 0 0 0 .725-.515c.175-.157.318-.331.43-.506l1.604.66c-.034.092-.113.175-.177.267-.105.116-.21.232-.346.33-.135.115-.27.23-.432.362a8.111 8.111 0 0 1-.537.35c-.414.26-.91.46-1.486.597-.476.115-.99.161-1.524.147a6.376 6.376 0 0 1-1.513-.26c-.51-.19-.979-.389-1.407-.629m2.376-2.625a2.27 2.27 0 0 0-.531-.107 2.417 2.417 0 0 0-.56.02c-.219.036-.39.1-.542.189-.152.09-.26.188-.319.314-.047.1-.08.21-.051.32a.706.706 0 0 0 .186.327c.101.105.216.2.345.289l1.97-1.153m-8.113 3.494c-.153.09-.29.188-.395.304a.708.708 0 0 0-.186.309l3.108 1.741a3.892 3.892 0 0 0 .715-.346c.393-.193.565-.494.454-.81-.173-.335-.506-.649-.98-.899m2.712-.006c.27.278.422.57.472.868a1.28 1.28 0 0 1-.21.868c-.216.308-.541.57-.943.806-.18.106-.39.21-.6.315-.21.105-.437.2-.647.306-.212.087-.424.175-.652.254-.212.088-.412.15-.6.188l-8.483-4.754 1.229-1.027 3.012 1.688c.087-.142.204-.283.337-.415a2.8 2.8 0 0 1 .52-.377 3.689 3.689 0 0 1 1.236-.45c.42-.083.891-.105 1.355-.068.51.048.995.145 1.443.3.48.174.965.398 1.409.647m-4.297 5.966a8.032 8.032 0 0 1-1.152.8c-.372.237-.826.412-1.33.543-.404.091-.83.122-1.278.094a5.295 5.295 0 0 1-1.278-.287 7.883 7.883 0 0 1-1.252-.575l-3.346-1.875 1.498-.877 3.155 1.768c.555.311 1.021.493 1.384.553a1.57 1.57 0 0 0 1.072-.21c.11-.064.222-.13.33-.211.11-.082.207-.139.272-.214l-4.645-2.603 1.498-.877 5.834 3.27m-12.498 2.483a9.118 9.118 0 0 1-.129-.597c-.053-.205-.09-.384-.139-.555-.05-.17-.083-.332-.113-.46l1.776-1.04c.099.47.212.93.307 1.365.081.443.165.903.206 1.387.46.003.906.015 1.37.052.493.038.987.076 1.512.132.495.056 1.007.12 1.474.191.468.071.892.15 1.257.227l-1.72 1.007c-.317-.05-.648-.093-1.025-.145-.376-.052-.767-.096-1.16-.157a18.49 18.49 0 0 0-1.196-.099 8.72 8.72 0 0 0-1.054-.019l2.647 1.484-1.498.877-8.688-4.87 1.228-1.027 5.058 2.834", fill: "#C9E5EB" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m339.286 222.354 76.909-44.329a2.067 2.067 0 0 0-.005-3.584l-51.653-29.569a5.787 5.787 0 0 0-5.758.005L256.14 203.849a2.067 2.067 0 0 0-.004 3.581l137.054 79.194a5.787 5.787 0 0 0 5.786.003l166.777-96.15a2.48 2.48 0 0 0 .006-4.293L387.073 82.494a5.787 5.787 0 0 0-5.82.006L199.957 188.245a2.067 2.067 0 0 0 .01 3.576l49.863 28.75a2.067 2.067 0 0 1-.016 3.589l-25.369 14.339h0", stroke: "#EFD9DA", strokeWidth: 0.827, strokeLinecap: "round", strokeLinejoin: "round" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { filter: "url(#kubernetesElephant_svg__a)", transform: "translate(287.687 157.897)", fill: "#000", opacity: 0.3 },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { filter: "url(#kubernetesElephant_svg__b)", xlinkHref: "#kubernetesElephant_svg__c" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { opacity: 0.299, filter: "url(#kubernetesElephant_svg__d)", fill: "#000", transform: "translate(389.782 196.751)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { filter: "url(#kubernetesElephant_svg__e)", xlinkHref: "#kubernetesElephant_svg__f" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(389.782 196.751)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#000", filter: "url(#kubernetesElephant_svg__g)", xlinkHref: "#kubernetesElephant_svg__h" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#FCFCFC", xlinkHref: "#kubernetesElephant_svg__h" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m469.57 229.485 19.03 11.195a.827.827 0 0 1 0 1.425l-4.977 2.928a1.653 1.653 0 0 1-1.677 0l-19.03-11.195a.827.827 0 0 1 0-1.425l4.977-2.928a1.653 1.653 0 0 1 1.676 0z", fill: "#D9E7EA" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#FFF", strokeWidth: 0.827, strokeLinecap: "round", d: "m474.104 235.192 7.027 4.134" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m437.867 217.75 6.064 3.449a.413.413 0 0 1 .01.713l-8.519 5.169a.827.827 0 0 1-.826.018l-6.468-3.544a.413.413 0 0 1-.006-.721l8.927-5.084a.827.827 0 0 1 .818 0z", fill: "#D9E7EA" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m433.711 221.445 3.736 2.011a.413.413 0 0 1 .012.722l-1.856 1.08a.827.827 0 0 1-.82.006l-3.747-2.105a.413.413 0 0 1 .01-.726l1.889-.992a.827.827 0 0 1 .776.004z", fill: "#FFF" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(283.76 88.042)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#000", filter: "url(#kubernetesElephant_svg__i)", xlinkHref: "#kubernetesElephant_svg__j" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#FCFCFC", xlinkHref: "#kubernetesElephant_svg__j" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(283.967 101.269)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#000", filter: "url(#kubernetesElephant_svg__k)", xlinkHref: "#kubernetesElephant_svg__l" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#FCFCFC", xlinkHref: "#kubernetesElephant_svg__l" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m297.61 129.965 33.686-19.249a.413.413 0 0 1 .618.359v2.115c0 .296-.159.57-.416.717l-33.686 19.25a.413.413 0 0 1-.618-.36v-2.114c0-.297.159-.57.416-.718z", fill: "#E9F3F5" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(283.967 126.896)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#000", filter: "url(#kubernetesElephant_svg__m)", xlinkHref: "#kubernetesElephant_svg__n" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#FCFCFC", xlinkHref: "#kubernetesElephant_svg__n" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m297.61 155.592 33.686-19.249a.413.413 0 0 1 .618.36v2.114c0 .297-.159.57-.416.718l-33.686 19.249a.413.413 0 0 1-.618-.36v-2.114c0-.297.159-.57.416-.718z", fill: "#E9F3F5" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(283.967 151.697)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#000", filter: "url(#kubernetesElephant_svg__o)", xlinkHref: "#kubernetesElephant_svg__p" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#FCFCFC", xlinkHref: "#kubernetesElephant_svg__p" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m297.61 180.393 33.686-19.25a.413.413 0 0 1 .618.36v2.114a.827.827 0 0 1-.416.718l-33.686 19.25a.413.413 0 0 1-.618-.36v-2.114c0-.297.159-.57.416-.718z", fill: "#E9F3F5" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#EFD9DA", strokeWidth: 0.827, strokeLinecap: "round", strokeLinejoin: "round", d: "M465.838 185.178v45.054" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(439.384 204.605)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#000", filter: "url(#kubernetesElephant_svg__q)", xlinkHref: "#kubernetesElephant_svg__r" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "url(#kubernetesElephant_svg__s)", xlinkHref: "#kubernetesElephant_svg__r" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m455.324 230.558 4.367 2.669a2.48 2.48 0 0 1 1.186 2.116v13.345a1.24 1.24 0 0 1-1.886 1.058l-4.367-2.668a2.48 2.48 0 0 1-1.187-2.116v-13.346a1.24 1.24 0 0 1 1.887-1.058z", fill: "#D9E7EA" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(214.938 86.389)", fill: "#5DA7B5" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 1.653, cy: 115.323, r: 1.653 }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 38.854, cy: 70.682, r: 1.653 }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 157.07, cy: 1.653, r: 1.653 }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 197.991, cy: 93.829, r: 1.653 }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 103.749, cy: 156.657, r: 1.653 }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 172.777, cy: 196.751, r: 1.653 }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 336.875, cy: 112.016, r: 1.653 })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M357.764 238.492c21.687 0 35.694-4.08 29.248-16.342-6.445-12.262-26.01-15.39-47.698-15.39-21.687 0-34.373 8.812-30.837 15.39 3.537 6.578 27.6 16.342 49.287 16.342z", fill: "#B8DEE3", style: {
                mixBlendMode: 'multiply',
            }, filter: "url(#kubernetesElephant_svg__t)", transform: "rotate(-29 348.24 222.626)" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#9FB8BC", style: {
                mixBlendMode: 'multiply',
            }, filter: "url(#kubernetesElephant_svg__u)", d: "m31.414 171.692 15.038-8.686 14.31 8.531-14.937 8.532z", transform: "translate(289.753 61.175)" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m86.785 153.97 5.134-7.498 8.992 6.2c-.27 3.079-2.819 4.632-7.644 4.657-4.824.026-6.985-1.094-6.482-3.359z", fill: "#9FB8BC", style: {
                mixBlendMode: 'multiply',
            }, filter: "url(#kubernetesElephant_svg__v)", transform: "translate(289.753 61.175)" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m72.731 146.53 5.135-7.498 8.992 6.2c-.271 3.079-2.82 4.631-7.644 4.657-4.825.025-6.986-1.094-6.483-3.359z", fill: "#9FB8BC", style: {
                mixBlendMode: 'multiply',
            }, filter: "url(#kubernetesElephant_svg__w)", transform: "translate(289.753 61.175)" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(321.168 207.912)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", { id: "kubernetesElephant_svg__z", fill: "#fff" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#kubernetesElephant_svg__x" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#F69279", xlinkHref: "#kubernetesElephant_svg__x" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M7.01 8.887c.369-4.507 2.166-7.05 5.39-7.63 3.225-.581 9.04 1.248 17.447 5.488-4.19 1.918-8.787 3.578-13.79 4.979-5.001 1.4-8.017.455-9.047-2.837z", fillOpacity: 0.7, fill: "#A4A4A4", style: {
                    mixBlendMode: 'multiply',
                }, filter: "url(#kubernetesElephant_svg__y)", mask: "url(#kubernetesElephant_svg__z)" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#F69279", d: "m309.62 65.435 14.52 8.243 2.647 14.285-15.554-9.399z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#D06868", d: "m321.78 232.381-.612-15.75 14.376 8.104v16.21zM297.194 77.363l12.426-11.928 1.613 13.13-12.82 12.491z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#A5597E", d: "M335.544 240.946v-16.211l14.886-8.259-.211 15.75zM298.286 90.8l12.947-12.236 15.554 9.4-12.705 11.789z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m345.555 190.436-10.747 6.12v8.991l10.747-6.12v-8.991zm-28.935-28.104-6.613 3.809v5.508l6.614-3.808v-5.509zm-13.226.036v5.577l5.787 3.668v-5.577l-5.787-3.668z", stroke: "#979797", strokeWidth: 0.827, fill: "#D8D8D8" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(288.27 61.175)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#4B2357", xlinkHref: "#kubernetesElephant_svg__A" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "url(#kubernetesElephant_svg__B)", xlinkHref: "#kubernetesElephant_svg__A" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M380.988 184.006c0 6.258-.79 4.943-4.447 10.296-.364.533-2.324-.627-2.576 0-1.045 2.6.533 7.668 1.537 10.987.341 1.13-1.063 3.871-2.436 4.329-1.594.53-2.684 1.45-4.06 1.392-3.007-.127-6.883-1.613-5.642-4.006 1.456-2.807-3.93-7.592-2.119-16.17.836-3.958 19.743-13.086 19.743-6.828z", fill: "#4B2357" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M300.356 166.37c3.337 1.469 7.245 1.2 9.115 1.507 2.34.385 1.871 3.156 1.864 3.83-2.007.248-6.25.097-9.41-1.343-5.398-2.463-9.62-9.27-9.176-9.683a.095.095 0 0 1 .018-.013c.517-.285 4.086 4.161 7.589 5.703", fill: "#D3CBAF" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(309.594 150.457)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", { id: "kubernetesElephant_svg__E", fill: "#fff" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#kubernetesElephant_svg__C" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#4E587D", xlinkHref: "#kubernetesElephant_svg__C" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "url(#kubernetesElephant_svg__D)", xlinkHref: "#kubernetesElephant_svg__C" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M64.517 45.913c.574-2.71 1.048-4.96 1.422-6.749.373-1.788.944-3.638 1.713-5.549-3.05 6.467-6.155 9.7-9.315 9.7-4.741 0-8.233-1.82-9.506-3.604-1.273-1.785-.672-7.852-2.47-11.675-1.199-2.55-2.367-3.662-3.506-3.339 2.649 1.063 3.267 4.287 1.855 9.67-1.411 5.385-2.444 8.368-3.098 8.948l8.934 6.596 13.971-3.998z", fill: "#4C3D6A", mask: "url(#kubernetesElephant_svg__E)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M35.297 25.937c6.324-4.368 12.666-6.553 19.025-6.553 9.54 0 8.964 1.175 11.65 3.957 1.79 1.854 2.779 3.845 2.964 5.971 2.198-3.674 4.502-6.983 6.912-9.928 3.616-4.417 9.73-5.063 12.194.456 1.642 3.68 2.397-2.83 2.265-19.53L27.281 5.637l8.016 20.3z", fill: "#4F6486", opacity: 0.5, mask: "url(#kubernetesElephant_svg__E)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M29.037 1.964c1.078 8.624 2.697 13.481 4.857 14.57 4.887 2.462 18.717-5.407 22.127-4.672 8.508 1.833 8.87 5.542 12.386 4.155 3.515-1.386 2.534-6.666 11.313-5.986 5.853.453 10.005 3.24 12.455 8.363L90.307-2.17c-12.878-2.21-22.94-3.072-30.185-2.583-7.246.488-17.607 2.727-31.085 6.717z", fill: "#4F728F", opacity: 0.5, mask: "url(#kubernetesElephant_svg__E)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M35.785 16.383c.649 0 8.41-8.134 16.293-8.962 3.403-.357 8.42-1.484 11.78.676 3.833 2.464 2.11 2.345 5.038.817 3.338-1.742 8.118-1.506 1.77-4.78-4.54-2.343-12.709-4.63-24.508-6.864L14.054-5.395C27.922 9.124 35.166 16.383 35.785 16.383z", fill: "#507E98", opacity: 0.4, mask: "url(#kubernetesElephant_svg__E)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M25.747 36.06c1.121-1.094 2.436-4.153 3.945-9.176l-23.83.835c3.94 5.42 6.962 8.606 9.065 9.558 4.347 1.967 10.17-.582 10.82-1.216z", fill: "#4C3D6A", mask: "url(#kubernetesElephant_svg__E)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { mask: "url(#kubernetesElephant_svg__E)" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#000", filter: "url(#kubernetesElephant_svg__F)", xlinkHref: "#kubernetesElephant_svg__G" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#4F7C96", xlinkHref: "#kubernetesElephant_svg__G" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M40.836 44.36c-1.512 1.82-2.977 2.394-4.393 1.721a15.967 15.967 0 0 0-4.393-1.365c1.415 1.704 3.079 2.901 4.992 3.59 1.914.69 3.178-.625 3.794-3.945z", fill: "#4C3D6A", mask: "url(#kubernetesElephant_svg__E)" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(294.577 107.334)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", { id: "kubernetesElephant_svg__J", fill: "#fff" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#kubernetesElephant_svg__H" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#4F7C96", xlinkHref: "#kubernetesElephant_svg__H" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "url(#kubernetesElephant_svg__I)", xlinkHref: "#kubernetesElephant_svg__H" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M47.071 81.564c-.426-6.445.187-10.674 1.84-12.688 2.48-3.02 8.426-9.565 4.96-13.231-2.247-2.378-10.153-2.483-12.649 0-1.354 1.346 1.833 3.821 1.636 6.27-.374 4.64-.374 10.821 0 18.541l4.213 1.108z", fill: "#4E567C", mask: "url(#kubernetesElephant_svg__J)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M16.51.675c4.84-2.438 7.26-2.438 7.26 0 0 1.952-1.32 4.136-2.89 4.35-1.372.185-3.022-1.522-2.984-1.134.7 7.15 4.148 14.116-2.335 21.646-.255.278 1.047.085 0 .639-.67.353-1.75-.22-1.928 0-.575.709 1.185 1.198.73 1.516-.96.67-1.826-1.516-2.846-.643-.537.46 1.584 2.034 1.02 2.389-.512.322-1.306-1.552-1.813-1.196-1.908 1.34-4.214 4.22-5.559 7.027-.263.55-.81 2.272-1.094 3.1-.082.238 1.175.473 1.094.717-.104.316-1.621.595-1.722.908-.132.413-.086.557-.206.933-.147.459 1.232.193 1.093.677-.12.417-1.516.786-1.629 1.218-1.96 7.47.927 10.123 2.464 15.112 2.068 6.711 4.25 11.278 6.545 13.699-2.335.05-3.82-.409-4.455-1.378C6.302 68.8-4.711 61.233-5.65 52.972c-.626-5.507 2.979-15.678 10.815-30.514L13.633 6.2 16.51.675z", fill: "#5DA7B5", mask: "url(#kubernetesElephant_svg__J)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M44.054 71.636c-.436-1.996-.436-3.596 0-4.8.655-1.806 1.757-3.984 0-3.984-1.756 0 .129 2.672-.814 4.913-.942 2.242-7.197 3.077-11.69 3.077-4.491 0-16.054-2.314-17.947-.835-1.262.986-1.262 4.066 0 9.24 15.47-1.713 23.903-2.75 25.3-3.108 1.398-.359 3.115-1.86 5.151-4.503z", fill: "#4C416D", mask: "url(#kubernetesElephant_svg__J)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M23.77 24.341c-2.057 2.908-4.424 5.217-7.1 6.927-4.013 2.565-6.836 2.776-9.857 7.721-.76 1.243-1.91 3.81-2.893 6.969a96.806 96.806 0 0 0-.509 1.75 131.87 131.87 0 0 0-.423 1.688C.874 58.576 1.262 70.133 14.417 70.66c19.856.795-9.807 1.255-7.604-16.377.93-7.449 4.838-18.752 9.857-20.851 4.107-1.717 6.473-4.747 7.1-9.09z", fill: "#4D547F", opacity: 0.4, mask: "url(#kubernetesElephant_svg__J)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M15.52 72.057c-.174.252.523.378 2.09.378 1.569 0 5.048-.375 10.437-1.125-3.251-.433-5.804-.65-7.657-.65-1.853 0-3.476.466-4.87 1.397z", fill: "#4B2A5C", mask: "url(#kubernetesElephant_svg__J)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M25.98 71.05c4.31.625 7.511.747 9.605.365 2.094-.382 4.033-1.039 5.818-1.972H31.55c-2.205 0-4.207-.189-6.006-.567l.436 2.174z", fill: "#4E567C", mask: "url(#kubernetesElephant_svg__J)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M15.017 50.15c1.787 2.353 4.058 3.53 6.813 3.53 4.134 0 6.414-7.529 10.547-10.144 1.544-.977 3.126-1.182 5.137-1.375 1.052-.1 2.764-.137 5.136-.108-6.145-5.215-11.499-7.2-16.06-5.957-4.56 1.243-8.418 5.928-11.573 14.054z", fill: "#4F718F", mask: "url(#kubernetesElephant_svg__J)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M19.285 52.541c-3.795 1.093-7.36-8.255-7.575-7.833-1.36 2.664 4.706 12.922 10.747 11.997.568-.087.998-.466 1.403-1.005.16-.213-1.189-1.624-1.03-1.878.124-.2 1.754.764 1.885.547.13-.215-1.088-1.174-.945-1.398.157-.245 1.677.245 1.858 0 .684-.93 1.57-1.829 2.888-2.422.447-.2 1.34-.4 2.68-.598-.739-.69-1.147-1.164-1.225-1.421-.529-1.751 1.924-3.787 3.503-4.47 3.422-1.48 6.48-2.149 9.176-2.007l-5.204-3.775c-7.934 1.89-11.9 4.033-11.9 6.43 0 3.595-2.465 6.74-6.26 7.833zM54.93 68.876c4.163-9.177 4.73-15.063 1.699-17.657-3.749-3.207-13.023.392-13.92.803-1.536.705-3.603.886-6.198.541 1.228-.016 3.294-1.33 6.199-3.94 2.904-2.61 2.904-4.8 0-6.57.865-.255 1.828-.022 2.89.698.658.448 14.471 0 18.355 9.271 3.026 7.223.018 12.841-9.026 16.854zm-26.1-2.424c-2.128.014-3.977.207-5.546.578 1.115.965 1.869 1.405 2.261 1.32 2.696-.585 4.103 0 6.006 0 2.482 0 2.16-.633-.964-1.898.956-.013.37-.013-1.758 0z", fill: "#507E98", mask: "url(#kubernetesElephant_svg__J)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { mask: "url(#kubernetesElephant_svg__J)" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M12.263 9.02C9.13 10.884 5.218 11.093 3.4 11.626c-2.276.667-1.473 3.36-1.384 4.029 2.022 0 6.216-.666 9.175-2.48 5.059-3.103 8.42-10.374 7.929-10.73a.095.095 0 0 0-.02-.01c-.548-.22-3.548 4.628-6.837 6.585", fill: "url(#kubernetesElephant_svg__K)", transform: "scale(-1 1) rotate(10 -327.828 -116.827)" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M26.006 70.918c.071-1.988-.382-2.55-.382-2.55s-.37 1.413-1.94 1.545c-1.81.153-4.253.241-7.583-1.022-3.54-1.344-7.086-5.05-7.086-5.05s2.352 4.115 7.744 6.245c3.155 1.245 7.302 1.176 9.247.832", fill: "#D3CBAF" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M30.454 59.506c0-1.12 3.988-1.83 6.41-.963 2.423.867 3.786 3.016 2.226 5.049-1.559 2.033-2.587-1.028-4.629-1.677-2.041-.65-4.007-1.29-4.007-2.41z", fill: "#4E567C", mask: "url(#kubernetesElephant_svg__J)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { mask: "url(#kubernetesElephant_svg__J)" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M35.223 59.144c.6.331 1.016.725.684 1.324-.331.6-1.286 1.177-1.885.846a1.24 1.24 0 1 1 1.2-2.17z", fill: "#020408" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M35.385 59.706a.413.413 0 1 1-.724-.4.413.413 0 0 1 .724.4", fill: "#D5B8D8" }))),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { opacity: 0.303, filter: "url(#kubernetesElephant_svg__L)", fill: "#000", transform: "translate(180.218 217.832)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { filter: "url(#kubernetesElephant_svg__M)", xlinkHref: "#kubernetesElephant_svg__N" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(180.218 217.832)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#000", filter: "url(#kubernetesElephant_svg__O)", xlinkHref: "#kubernetesElephant_svg__P" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#FCFCFC", xlinkHref: "#kubernetesElephant_svg__P" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m239.75 256.352 19.031 11.195a.827.827 0 0 1 0 1.425l-4.977 2.928a1.653 1.653 0 0 1-1.676 0l-19.031-11.195a.827.827 0 0 1 0-1.425l4.977-2.928a1.653 1.653 0 0 1 1.677 0z", fill: "#D9E7EA" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#FFF", strokeWidth: 0.827, strokeLinecap: "round", d: "m240.98 262.886 7.025 4.133" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m266.213 274.162 1.88 1.175a.413.413 0 0 1-.011.708l-3.507 2.045c-.53.31-1.188.3-1.709-.026l-1.88-1.175a.413.413 0 0 1 .011-.707l3.507-2.046a1.65 1.65 0 0 1 1.709.026zM273.633 250.9l7.44 4.546-13.608 8.165a1.653 1.653 0 0 1-1.713-.007l-5.421-3.313a.827.827 0 0 1 .006-1.414l13.296-7.978z", fill: "#D9E7EA" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(252.553 221.965)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#000", filter: "url(#kubernetesElephant_svg__Q)", xlinkHref: "#kubernetesElephant_svg__R" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "url(#kubernetesElephant_svg__s)", xlinkHref: "#kubernetesElephant_svg__R" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(258.34 234.779)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m16.522 8.95 5.361 2.978c.525.291.85.845.85 1.445v5.89a.827.827 0 0 1-1.227.722l-5.362-2.979a1.653 1.653 0 0 1-.85-1.445V9.67a.827.827 0 0 1 1.228-.722z", fill: "#CC6769" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#CC6769", strokeWidth: 0.827, strokeLinecap: "round", d: "M8.267 4.547V12.4M9.92 7.027v6.2M6.613 5.373v5.787M4.96 7.44v2.894" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { fill: "#5DA7B5", cx: 1.033, cy: 1.033, r: 1.033 })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m229.844 232.791 16.546 9.56a.827.827 0 0 1 .018 1.42l-10.79 6.614a1.653 1.653 0 0 1-1.691.022l-16.546-9.56a.827.827 0 0 1-.018-1.42l10.79-6.614a1.653 1.653 0 0 1 1.691-.022z", fill: "#D9E7EA" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m228.644 241.18 3.83 2.148a.413.413 0 0 1 .009.717l-2.098 1.242a.827.827 0 0 1-.833.006l-3.817-2.192a.413.413 0 0 1 0-.717l2.093-1.2a.827.827 0 0 1 .816-.003z", fill: "#FFF" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(216.178 218.245)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#000", filter: "url(#kubernetesElephant_svg__S)", xlinkHref: "#kubernetesElephant_svg__T" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "url(#kubernetesElephant_svg__U)", xlinkHref: "#kubernetesElephant_svg__T" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M237.672 230.645v4.96m1.654-2.48v3.307m-3.307-4.96v2.893m-1.653-2.067v1.24", stroke: "#CC6769", strokeLinecap: "round", strokeWidth: 0.827 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m277.955 275.7-.153.621c.563.007.863.635.67 1.422-.193.787-.806 1.436-1.38 1.469l-.152.621c.822-.038 1.705-.971 1.983-2.1.277-1.13-.156-2.032-.968-2.033", fill: "#D9E7EA" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(271.566 274.46)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", { id: "kubernetesElephant_svg__W", fill: "#fff" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#kubernetesElephant_svg__V" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M5.459 5.447s-.615 1.167-2.183 1.167C1.559 6.614.904 5.447.904 5.447L.008.17h6.496L5.46 5.447z", fill: "#D9E7EA", mask: "url(#kubernetesElephant_svg__W)" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M272.535 275.921c-1.292-.807-1.292-2.116 0-2.923 1.291-.807 3.385-.807 4.676 0 1.292.808 1.292 2.116 0 2.923-1.29.807-3.385.807-4.676 0", fill: "#D9E7EA" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M272.535 275.921c-1.292-.807-1.292-2.116 0-2.923 1.291-.807 3.385-.807 4.676 0 1.292.808 1.292 2.116 0 2.923-1.29.807-3.385.807-4.676 0z", stroke: "#000", strokeWidth: 0.5 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M272.827 275.982c-1.13-.727-1.13-1.904 0-2.63 1.13-.727 2.962-.727 4.092 0 1.13.726 1.13 1.903 0 2.63-1.13.726-2.962.726-4.092 0", fill: "#B7C2C4" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M272.827 275.982c-1.13-.727-1.13-1.904 0-2.63 1.13-.727 2.962-.727 4.092 0 1.13.726 1.13 1.903 0 2.63-1.13.726-2.962.726-4.092 0z", stroke: "#000", strokeWidth: 0.5 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M273.102 274.866c-.4.221-.636.499-.709.786.113.114.246.221.4.32 1.149.739 3.011.739 4.16 0 .154-.099.287-.206.4-.32-.073-.287-.31-.565-.709-.786-.978-.542-2.564-.542-3.542 0", fill: "#754C24" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m1.99 69.44 20.29-11.355a8.267 8.267 0 0 1 8.144.04L63.69 77.172a7.44 7.44 0 0 1 .113 12.847l-21.65 12.91L1.989 79.924V69.439z", fill: "#5DA7B5", opacity: 0.5, filter: "url(#kubernetesElephant_svg__X)", transform: "translate(396.68 62.822)" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(397.43 107.463)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", { id: "kubernetesElephant_svg__aa", fill: "#fff" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#kubernetesElephant_svg__Y" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#5DA7B5", xlinkHref: "#kubernetesElephant_svg__Y" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#338392", filter: "url(#kubernetesElephant_svg__Z)", mask: "url(#kubernetesElephant_svg__aa)", d: "m44.123 36.597 27.015-15.34 4.637 2.31-29.902 18.106z" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m4.552 11.803 41.568 24.11a4.96 4.96 0 0 1 2.472 4.29v3.065a3.422 3.422 0 0 1-5.13 2.964L2.068 22.367a3.72 3.72 0 0 1-1.862-3.223v-4.838a2.893 2.893 0 0 1 4.345-2.503z", fill: "url(#kubernetesElephant_svg__ab)", transform: "translate(396.68 107.463)" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(400.116 122.35)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(4 -2.612 7.985)", fill: "#CC6769" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 0.62, cy: 0.62, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 2.273, cy: 1.447, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 3.927, cy: 2.273, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 5.58, cy: 3.1, r: 1 })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(4 -32.203 9.018)", fill: "#CC6769" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 0.62, cy: 0.62, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 2.273, cy: 1.447, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 3.927, cy: 2.273, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 5.58, cy: 3.1, r: 1 })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(4 -61.795 10.052)", fill: "#CC6769" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 0.62, cy: 0.62, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 2.273, cy: 1.447, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 3.927, cy: 2.273, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 5.58, cy: 3.1, r: 1 })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { fill: "#5DA7B5", cx: 39.888, cy: 25.834, r: 1.447 })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(397.43 92.582)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", { id: "kubernetesElephant_svg__ae", fill: "#fff" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#kubernetesElephant_svg__ac" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#5DA7B5", xlinkHref: "#kubernetesElephant_svg__ac" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#338392", filter: "url(#kubernetesElephant_svg__ad)", mask: "url(#kubernetesElephant_svg__ae)", d: "m44.123 36.597 27.015-15.34 4.637 2.31-29.902 18.106z" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m4.552 11.803 41.568 24.11a4.96 4.96 0 0 1 2.472 4.29v3.065a3.422 3.422 0 0 1-5.13 2.964L2.068 22.367a3.72 3.72 0 0 1-1.862-3.223v-4.838a2.893 2.893 0 0 1 4.345-2.503z", fill: "url(#kubernetesElephant_svg__ab)", transform: "translate(396.68 92.582)" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(400.116 107.47)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(4 -2.612 7.985)", fill: "#CC6769" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 0.62, cy: 0.62, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 2.273, cy: 1.447, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 3.927, cy: 2.273, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 5.58, cy: 3.1, r: 1 })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(4 -32.203 9.018)", fill: "#CC6769" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 0.62, cy: 0.62, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 2.273, cy: 1.447, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 3.927, cy: 2.273, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 5.58, cy: 3.1, r: 1 })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(4 -61.795 10.052)", fill: "#CC6769" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 0.62, cy: 0.62, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 2.273, cy: 1.447, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 3.927, cy: 2.273, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 5.58, cy: 3.1, r: 1 })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { fill: "#5DA7B5", cx: 39.888, cy: 25.834, r: 1.447 })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(397.43 77.702)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", { id: "kubernetesElephant_svg__ah", fill: "#fff" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#kubernetesElephant_svg__af" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#5DA7B5", xlinkHref: "#kubernetesElephant_svg__af" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#338392", filter: "url(#kubernetesElephant_svg__ag)", mask: "url(#kubernetesElephant_svg__ah)", d: "m44.123 36.597 27.015-15.34 4.637 2.31-29.902 18.106z" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m4.552 11.803 41.568 24.11a4.96 4.96 0 0 1 2.472 4.29v3.065a3.422 3.422 0 0 1-5.13 2.964L2.068 22.367a3.72 3.72 0 0 1-1.862-3.223v-4.838a2.893 2.893 0 0 1 4.345-2.503z", fill: "url(#kubernetesElephant_svg__ab)", transform: "translate(396.68 77.702)" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(400.116 92.589)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(4 -2.612 7.985)", fill: "#CC6769" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 0.62, cy: 0.62, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 2.273, cy: 1.447, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 3.927, cy: 2.273, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 5.58, cy: 3.1, r: 1 })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(4 -32.203 9.018)", fill: "#CC6769" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 0.62, cy: 0.62, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 2.273, cy: 1.447, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 3.927, cy: 2.273, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 5.58, cy: 3.1, r: 1 })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(4 -61.795 10.052)", fill: "#CC6769" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 0.62, cy: 0.62, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 2.273, cy: 1.447, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 3.927, cy: 2.273, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 5.58, cy: 3.1, r: 1 })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { fill: "#5DA7B5", cx: 39.888, cy: 25.834, r: 1.447 })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(397.43 62.822)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", { id: "kubernetesElephant_svg__ak", fill: "#fff" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#kubernetesElephant_svg__ai" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#5DA7B5", xlinkHref: "#kubernetesElephant_svg__ai" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#338392", filter: "url(#kubernetesElephant_svg__aj)", mask: "url(#kubernetesElephant_svg__ak)", d: "m44.123 36.597 27.015-15.34 4.637 2.31-29.902 18.106z" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m4.552 11.803 41.568 24.11a4.96 4.96 0 0 1 2.472 4.29v3.065a3.422 3.422 0 0 1-5.13 2.964L2.068 22.367a3.72 3.72 0 0 1-1.862-3.223v-4.838a2.893 2.893 0 0 1 4.345-2.503z", fill: "url(#kubernetesElephant_svg__ab)", transform: "translate(396.68 62.822)" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(400.116 77.708)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(4 -2.612 7.985)", fill: "#CC6769" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 0.62, cy: 0.62, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 2.273, cy: 1.447, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 3.927, cy: 2.273, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 5.58, cy: 3.1, r: 1 })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(4 -32.203 9.018)", fill: "#CC6769" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 0.62, cy: 0.62, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 2.273, cy: 1.447, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 3.927, cy: 2.273, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 5.58, cy: 3.1, r: 1 })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(4 -61.795 10.052)", fill: "#CC6769" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 0.62, cy: 0.62, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 2.273, cy: 1.447, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 3.927, cy: 2.273, r: 1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: 5.58, cy: 3.1, r: 1 })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { fill: "#5DA7B5", cx: 39.888, cy: 25.834, r: 1.447 })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M287.48 135.234v2.674m1.18-1.965-2.36 1.256M287.48 185.662v2.674m1.18-1.965-2.36 1.256M288.66 161.57l-2.36 1.256M287.48 141.157v17.773m0 6.614v16.947", stroke: "#CC6769", strokeLinecap: "round", strokeWidth: 0.827 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(453.85 148.803)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#000", filter: "url(#kubernetesElephant_svg__al)", xlinkHref: "#kubernetesElephant_svg__am" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#4C2A5C", xlinkHref: "#kubernetesElephant_svg__am" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { opacity: 0.757 },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#FFF", d: "m484.486 250.79 1.246.719v-1.439l-1.246-.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m485.732 251.509-1.246-.72v-1.438l1.246.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#ED1C24", d: "m486.977 252.228-1.245-.72v-1.438l1.245.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m486.977 252.228-1.245-.72v-1.438l1.245.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#009245", d: "m488.223 252.947-1.246-.72v-1.438l1.246.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m488.223 252.947-1.246-.72v-1.438l1.246.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#0071BC", d: "m484.486 252.228 1.246.72v-1.44l-1.246-.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m485.732 252.947-1.246-.72v-1.438l1.246.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#FFF", d: "m486.977 253.666-1.245-.719v-1.438l1.245.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m486.977 253.666-1.245-.719v-1.438l1.245.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#009245", d: "m488.223 254.386-1.246-.72v-1.438l1.246.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m488.223 254.386-1.246-.72v-1.438l1.246.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#D4145A", d: "m484.486 253.666 1.246.72v-1.44l-1.246-.718z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m485.732 254.386-1.246-.72v-1.438l1.246.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#009245", d: "m486.977 255.105-1.245-.72v-1.438l1.245.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m486.977 255.105-1.245-.72v-1.438l1.245.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#0071BC", d: "m486.977 255.105 1.246.72v-1.44l-1.246-.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m488.223 255.824-1.246-.72v-1.438l1.246.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#FF0", d: "m489.467 252.228-1.246.719v-1.438l1.246-.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m489.467 252.228-1.246.719v-1.438l1.246-.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#FF0", d: "m490.712 251.509-1.245.719v-1.439l1.245-.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m490.712 251.509-1.245.719v-1.439l1.245-.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#F7931E", d: "M490.712 250.07v1.439l1.246-.72v-1.438z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m491.958 250.79-1.246.719v-1.439l1.246-.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#ED1C24", d: "m489.467 253.666-1.246.72v-1.439l1.246-.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m489.467 253.666-1.246.72v-1.439l1.246-.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#ED1C24", d: "m490.712 252.947-1.245.72v-1.44l1.245-.718z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m490.712 252.947-1.245.72v-1.44l1.245-.718z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#F7931E", d: "M490.712 251.509v1.438l1.246-.719v-1.439z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m491.958 252.228-1.246.72v-1.44l1.246-.718z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#F7931E", d: "M488.221 254.386v1.438l1.246-.72v-1.438z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m489.467 255.105-1.246.719v-1.439l1.246-.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#009245", d: "m490.712 254.386-1.245.719v-1.439l1.245-.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m490.712 254.386-1.245.719v-1.439l1.245-.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#F7931E", d: "M490.712 252.947v1.438l1.246-.718v-1.44z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m491.958 253.666-1.246.72v-1.439l1.246-.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#0071BC", d: "m489.467 249.363 1.246.72 1.245-.72-1.245-.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m489.467 249.363 1.246-.719 1.245.72-1.245.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#F7931E", d: "m488.221 250.083 1.246-.72 1.246.72-1.246.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m488.221 250.083 1.246-.72 1.246.72-1.246.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#ED1C24", d: "m486.976 250.802 1.246-.72 1.245.72-1.245.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m486.976 250.802 1.246-.72 1.245.72-1.245.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#F7931E", d: "m488.221 248.644 1.246-.72 1.246.72-1.246.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m488.221 248.644 1.246-.72 1.246.72-1.246.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#0071BC", d: "m486.975 249.363 1.247-.719 1.245.72-1.245.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m486.975 249.363 1.247-.719 1.245.72-1.245.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#FF0", d: "m485.73 250.083 1.246-.72 1.245.72-1.245.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m485.73 250.083 1.246-.72 1.245.72-1.245.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#FFF", d: "m486.975 247.925 1.246-.72 1.246.72-1.245.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m486.975 247.925 1.246-.72 1.246.72-1.245.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#009245", d: "m485.73 248.644 1.246-.72 1.245.72-1.245.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m485.73 248.644 1.246-.72 1.245.72-1.245.72z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#F7931E", d: "m484.484 249.363 1.246.72 1.245-.72-1.245-.719z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { stroke: "#000", strokeWidth: 0.5, d: "m484.484 249.363 1.246-.719 1.245.72-1.245.719z" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M412.123 88.182v-.932l.429.243v1.292c-.223.137-.53.104-.82-.06-.636-.362-1.105-1.315-1.105-2.274 0-.96.469-1.38 1.114-1.014.356.202.651.561.848 1.032l-.3.265c-.148-.329-.32-.54-.525-.656-.393-.224-.662.037-.662.642 0 .596.269 1.171.657 1.392.127.072.246.103.364.07zm1.848 1.813c-.64-.363-1.109-1.33-1.109-2.275 0-.946.469-1.38 1.109-1.017.636.361 1.108 1.325 1.108 2.275s-.472 1.378-1.108 1.017zm0-.628c.361.206.634-.054.634-.658 0-.605-.273-1.173-.634-1.379-.362-.205-.634.054-.634.659s.272 1.173.634 1.378zm2.446 2.016c-.64-.363-1.108-1.329-1.108-2.275 0-.945.468-1.38 1.108-1.016.637.361 1.109 1.325 1.109 2.275s-.472 1.378-1.109 1.016zm0-.627c.362.205.634-.054.634-.659 0-.604-.272-1.173-.634-1.378-.362-.205-.634.054-.634.659 0 .604.272 1.173.634 1.378zm2.834 1.473v-.933l.429.244v1.29c-.223.138-.53.105-.82-.06-.636-.36-1.105-1.314-1.105-2.273 0-.96.469-1.38 1.114-1.013.356.202.652.56.848 1.031l-.3.266c-.148-.33-.319-.54-.524-.657-.394-.223-.663.038-.663.642 0 .596.269 1.172.657 1.392.127.072.246.103.364.07zm.867 1.2v-3.182l.468.266v2.583l1.016.576v.6l-1.484-.842zm2.217.668 1.103.626v.591l-1.569-.89V91.24l1.531.87v.59l-1.065-.604v.69l.941.535v.573l-.94-.534v.736zm3.272 2.503c-.628-.356-1.097-1.309-1.097-2.268 0-.96.47-1.38 1.1-1.022.35.199.643.565.834 1.037l-.301.266c-.136-.323-.307-.547-.51-.662-.379-.215-.648.05-.648.65s.27 1.172.648 1.387c.203.115.374.084.51-.088l.3.607c-.19.26-.482.294-.836.093zm1.156.602v-3.183l.469.266v2.583l1.016.577v.6l-1.485-.843zm2.698 1.586c-.64-.363-1.108-1.33-1.108-2.275 0-.946.469-1.38 1.108-1.017.637.362 1.109 1.325 1.109 2.275s-.472 1.379-1.109 1.017zm0-.627c.362.205.634-.054.634-.659s-.272-1.173-.634-1.378c-.362-.206-.634.054-.634.658 0 .605.272 1.173.634 1.379zm2.366 1.97c-.576-.327-.918-1.04-.918-1.976v-1.782l.47.266v1.755c0 .605.167.95.45 1.111.287.163.452.006.452-.598v-1.755l.463.262v1.783c0 .936-.341 1.26-.917.934zm1.384.731V97.68l.92.523c.663.376 1.118 1.261 1.118 2.225 0 .964-.455 1.334-1.118.958l-.92-.523zm.469-.338.428.243c.403.228.666 0 .666-.609 0-.61-.263-1.136-.666-1.365l-.428-.243v1.974zm-16.33 21.297-.2-.795-1.047-.595-.2.569-.534-.304 1.005-2.612.515.293 1.009 3.755-.548-.31zm-1.08-1.854.716.406-.358-1.421-.357 1.015zm2.411 2.01 1.283.728v.6l-1.972-1.12v-.477l1.237-1.402-1.211-.688v-.6l1.897 1.077v.478l-1.234 1.404zm2.624 2.144c-.642-.364-1.022-1.098-1.022-2.034v-1.783l.522.297v1.755c0 .604.187.96.503 1.14.319.18.502.035.502-.57v-1.755l.516.293v1.782c0 .937-.38 1.24-1.021.875zm3.538 1.955-.56-.318-.436-1.134-.48-.272v.886l-.522-.296v-3.183l.976.554c.603.343.98.998.98 1.711 0 .478-.17.731-.464.742l.506 1.31zm-.57-2.352a.913.913 0 0 0-.48-.827l-.426-.241v1.109l.425.242c.32.18.48.063.48-.283zm1.463 2.268 1.227.697v.591l-1.746-.991v-3.183l1.704.968v.59l-1.185-.672v.69l1.047.595v.573l-1.047-.594v.736z", fill: "#CC6769", fillRule: "nonzero", opacity: 0.8 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "m419.695 108.116-.186-.789-.976-.56-.186.575-.498-.286.937-2.645.48.276.94 3.722-.51-.293zm-1.005-1.819.666.383-.333-1.41-.333 1.027zm4.336.549.465.267-.687 2.788-.523-.3-.462-2.42-.478 1.88-.519-.298-.69-3.58.504.29.474 2.51.496-1.953.45.259.48 2.531.49-1.974zm1.43 4.058a2.506 2.506 0 0 1-.856-.86l.165-.46c.177.298.441.586.694.73.288.166.405.088.405-.107 0-.596-1.222-.888-1.222-2.07 0-.542.288-.826.886-.483.264.152.534.402.73.7l-.15.474c-.196-.28-.397-.478-.583-.585-.289-.165-.4-.065-.4.135 0 .586 1.222.883 1.222 2.052 0 .532-.29.82-.891.474z", fill: "#CC6769", fillRule: "nonzero", opacity: 0.82 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M414.38 134.703c-.735-.419-1.273-1.426-1.273-2.371 0-.946.538-1.34 1.273-.921.731.416 1.273 1.42 1.273 2.37 0 .951-.542 1.338-1.273.922zm0-.628c.415.237.728.001.728-.604 0-.604-.313-1.196-.728-1.433-.416-.236-.728 0-.728.604 0 .605.312 1.197.728 1.433zm3.284-.739.532.303v3.183l-.442-.252-1.16-2.593v1.932l-.532-.303v-3.182l.446.253 1.156 2.592v-1.933zm.985 2.748v-.568l.94.535v.569l-.94-.536zm2.397-.822a1.998 1.998 0 0 1 1.01 1.73c0 .71-.389.93-1.01.575l-.469-.266v.877l-.538-.307v-3.182l1.007.573zm-.03 1.688c.329.188.495.078.495-.268a.93.93 0 0 0-.495-.837l-.439-.25v1.105l.439.25zm3.487 3.464-.578-.33-.449-1.141-.495-.282v.886l-.539-.307v-3.182l1.007.573a1.998 1.998 0 0 1 1.01 1.73c0 .478-.175.728-.478.733l.522 1.32zm-.588-2.363a.93.93 0 0 0-.495-.837l-.44-.25v1.11l.44.25c.329.187.495.073.495-.273zm1.51 2.297 1.266.721v.591l-1.802-1.026v-3.183l1.758 1.002v.59l-1.223-.696v.691l1.08.616v.573l-1.08-.616v.737zm4.32 3.052-.504-.287-.004-1.912-.684 1.183-.243-.138-.681-1.92v1.868l-.505-.287v-3.183l.445.254.87 2.473.858-1.489.442.252.007 3.186z", fill: "#CC6769", fillRule: "nonzero", opacity: 0.8 }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "rotate(-45 430.267 -462.969)", fillRule: "nonzero" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#000", filter: "url(#kubernetesElephant_svg__an)", xlinkHref: "#kubernetesElephant_svg__ao" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { fill: "#F69279", xlinkHref: "#kubernetesElephant_svg__ao" })))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgKubernetesElephant);


/***/ }),

/***/ "./lib/utils/components/Svgs/PachydermLogo.js":
/*!****************************************************!*\
  !*** ./lib/utils/components/Svgs/PachydermLogo.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const SvgPachydermLogo = (props) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", viewBox: "0 0 100 170" }, props),
    react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null,
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", { id: "pachydermLogo_svg__b", x1: "90.51%", x2: "0%", y1: "47.625%", y2: "56.172%" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { offset: "0%", stopColor: "#FE9B7C" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { offset: "100%", stopColor: "#D06868" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", { id: "pachydermLogo_svg__e", x1: "36.072%", x2: "65.768%", y1: "101.288%", y2: "13.528%" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { offset: "0%", stopColor: "#4C416C" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { offset: "100%", stopColor: "#4F7995" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", { id: "pachydermLogo_svg__k", x1: "60.159%", x2: "33.185%", y1: "-2.451%", y2: "98.382%" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { offset: "0%", stopColor: "#5190A5" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { offset: "100%", stopColor: "#4E6586" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", { id: "pachydermLogo_svg__m", x1: "78.616%", x2: "3.475%", y1: "38.058%", y2: "94.021%" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { offset: "0%", stopColor: "#EFE8CD" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { offset: "100%", stopColor: "#D3CAAF" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { id: "pachydermLogo_svg__a", d: "M23.339.051 6.133.068 0 5.137l18.739-.017z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { id: "pachydermLogo_svg__d", d: "M72.278 15.957c-6.324-3.48-4.458-12.84-4.458-12.84S68.16.751 66.456.414c-1.704-.337-2.216-.843-2.043 2.198.172 3.042-1.676 11.493 3.437 15.883 3.736 3.207 9.031 2.529 12.782 7.596 3.735 5.045-1.432 12.139-2.567 12.676-3.577 1.692-3.406 2.368-6.302 2.708-2.896.34-10.542-.5-14.8 1.023-4.258 1.523-3.085 3.044-7.172 5.58-4.087 2.538-10.899 5.922-13.793 9.135a11.167 11.167 0 0 0-2.337 4.137c-2.744.82-8.844 1.637-13.65 4.322-2.817 1.574-10.233 6.637-13.622 11.5C3.325 81.568 1.796 86.807.947 91.37.42 94.195.1 99.651.102 103.03c.003 3.33.487 5.983 1.077 9.25.263 1.456.508 3.983.508 5.611 0 1.629-.508 2.024-.508 3.157 0 1.132.355 1.484.628 1.76s0-.853 0-1.154c0-.3.405-1.095.528-.838.124.258-.018.02-.128 1.315-.11 1.294.97 3.737.97 2.629 0-1.109 0-2.63.257-3.292.257-.663.27-.155.27 0s-.067.524.1.448c.166-.076.46-.377.166-1.883-.295-1.506-.47-1.506-.573-2.142-.355-2.168-.35-3.258-.562-4.723-.343-2.365-.518-9.8-.349-12.336.258-3.878 1.26-4.327 1.7-5.07.701-1.184 1.395 7.154 4.439 14.53 2.58 6.25 6.137 6.248 7.5 7.6 1.364 1.35-1.187 7.267-.162 11.49.92 3.794-.337 6.253.004 7.267.342 1.014 4.431 2.193 7.497 2.193 3.067-.003 6.814-.85 6.813-2.202-.002-3.549-1.364-2.872-1.707-5.068-.342-2.197 3.186-5.416 3.573-8.114.678-4.732-.004-5.746-1.028-9.294-.066-.225-.514-4.393-.514-4.393s5.622.841 9.368-1.696c6.197-4.197 8.511-11.158 8.511-11.158s2.546 2.803 4.091 4.053c2.22 1.794 3.235 1.968 4.431 2.363 1.534.506 5.602 1.517 5.602 1.517s-2.022 2.367-3.214 3.213c-.843.598-3.255 2.537-2.744 3.55.512 1.014 2.187 3.76 3.922 4.899 3.088 2.025 5.644 2.7 6.495 2.53.852-.17 1.85-5.746 3.042-6.761 1.192-1.015 3.425-4.396 3.253-6.086-.168-1.656-.516-8.11-4.776-10.474-2.314-1.283-5.194-2.01-6.308-6.417-1.025-4.055-7.5-6.755-7.5-6.755 2.052-2.912 5.491-6.7 6.407-7.696.995.49 1.916.808 2.938.762 1.854-.085 1.288-2.114.222-4.899l.307.505s3.303-1.996 4.426-4.228c1.191-2.366 4.254-7.776 6.809-8.623 2.949-.976 8.175-3.722 7.663-4.736-.718-1.422-5.282-1.517-5.282-1.517s5.833-2.176 6.131-2.708c2.375-4.239 5.72-12.15 3.734-21.126-2.392-10.813-12.783-10.638-15.85-12.326Z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { id: "pachydermLogo_svg__g", d: "M6.39 16.246C3.324 20.64 1.795 25.88.946 30.444.42 33.269.1 38.724.102 42.104c.003 3.33.439 7.04 1.029 10.308.855 4.731 1.88 10.138 2.562 9.969.33-.083-.136-5.149-.858-10.139-.342-2.366-.518-9.8-.349-12.336.258-3.878 1.26-4.328 1.7-5.07.701-1.184 1.395 7.153 4.439 14.53 2.58 6.25 6.137 6.248 7.5 7.6 1.364 1.35-1.187 7.266-.162 11.49.92 3.793-.337 6.253.004 7.267.342 1.014 4.431 2.194 7.497 2.192 3.067-.002 6.814-.85 6.813-2.201-.002-3.549-1.364-2.872-1.706-5.069-.343-2.196 3.185-5.416 3.572-8.113.678-4.733-.004-5.746-1.028-9.294-.066-.226-.514-4.393-.514-4.393s5.622.841 9.368-1.696c6.197-4.197 8.511-11.159 8.511-11.159s2.546 2.804 4.091 4.054c2.22 1.794 3.235 1.968 4.431 2.363 1.534.506 5.602 1.517 5.602 1.517s-2.022 2.367-3.214 3.213c-.843.598-3.255 2.536-2.744 3.55.512 1.014 2.187 3.76 3.922 4.898 3.088 2.026 5.644 2.7 6.495 2.53.852-.168 1.85-5.746 3.042-6.76 1.192-1.015 3.425-4.396 3.253-6.086-.168-1.656-.516-8.111-4.776-10.474-2.314-1.283-5.194-2.01-6.308-6.418-1.025-4.055-7.5-6.754-7.5-6.754 2.383-3.382 6.639-7.947 6.639-7.947L34.573.09c-1.998.968-9.113 1.61-14.563 4.656-2.816 1.574-10.232 6.637-13.62 11.5Z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { id: "pachydermLogo_svg__j", d: "M34.801 18.404c3.735 3.207 9.03 2.529 12.782 7.596 3.734 5.045-1.433 12.138-2.568 12.676-3.576 1.692-3.405 2.368-6.301 2.707-.965.114-2.456.096-4.173.078-3.44-.035-7.787-.07-10.627.946-4.258 1.523-3.085 3.043-7.172 5.58-4.087 2.538-10.9 5.922-13.793 9.135C.055 60.334-.454 64.897.74 66.755c1.194 1.858 4.773 3.884 14.483 4.047 9.71.163 12.099 4.893 15.846 4.721 1.855-.084 1.289-2.113.222-4.897l.307.503s3.303-1.995 4.427-4.227c1.19-2.367 4.254-7.776 6.809-8.623 2.948-.977 8.174-3.723 7.663-4.736-.719-1.423-5.283-1.518-5.283-1.518s5.833-2.175 6.132-2.707c2.374-4.24 5.72-12.15 3.734-21.126-2.392-10.813-12.784-10.638-15.851-12.326-6.324-3.48-4.458-12.84-4.458-12.84S35.11.66 33.406.323C32.81.205 32.36.066 32.033.066c-.605 0-.782.478-.67 2.455.172 3.042-1.675 11.492 3.438 15.883Z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("radialGradient", { id: "pachydermLogo_svg__c", cx: "41.057%", cy: "27.737%", r: "60.073%", fx: "41.057%", fy: "27.737%", gradientTransform: "matrix(0 1 -.66914 0 .596 -.133)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { offset: "0%", stopOpacity: 0.5 }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", { offset: "100%", stopOpacity: 0 })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", { id: "pachydermLogo_svg__i", width: "143.6%", height: "132.4%", x: "-21.5%", y: "-15.9%", filterUnits: "objectBoundingBox" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", { in: "SourceAlpha", result: "shadowOffsetOuter1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", { in: "shadowOffsetOuter1", result: "shadowBlurOuter1", stdDeviation: 3 }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", { in: "shadowBlurOuter1", result: "shadowMatrixOuter1", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMerge", null,
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMergeNode", { in: "shadowMatrixOuter1" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMergeNode", { in: "SourceGraphic" })))),
    react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { fill: "none", fillRule: "evenodd" },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#D06868", d: "m68.995 147.694-4.6 5.12v16.392l4.6-5.07z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(45.656 147.694)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#pachydermLogo_svg__a", fill: "url(#pachydermLogo_svg__b)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#pachydermLogo_svg__a", fill: "url(#pachydermLogo_svg__c)" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#A5597E", d: "m64.395 152.764-18.74.016v16.443l18.74-.017z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#C1BBA7", d: "M70.685 87.271c-.002-.88-.694-4.578 2.963-4.674 2.922-.078 9.018.95 14.246-.387 5.559-1.422 11.263-6.72 11.95-6.105.687.615-5.996 8.765-14.456 11.043-4.95 1.332-11.574.793-14.703.123-1.22-.261.61.791-3.81.009" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(0 31.093)" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#4B2357", d: "M26.527 133.263s3.408.504 5.963.503a11.597 11.597 0 0 0 5.11-1.186c.681-.339 1.02-2.705-.684-3.887-1.117-.774-.311-8.085-2.051-10.813-2.046-3.21 1.525-12.844 1.525-12.844l-11.75 6.767s2.563 13.348 2.735 14.53c.17 1.183-1.53 6.423-.848 6.93" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#4B2A5C", d: "M55.655 88.887s-1.056 4.884 1.062 10.311c2.118 5.427 6.931 7.173 7.064 9.727.058 1.136-.547 2.361-.913 4.268-.455 2.379 1.143 4.698.123 6.656-.89 1.712-12.593 1.203-11.17-1.564 1.424-2.768 1.821-6.62 1.876-7.293.056-.674-7.188-8.21-6.63-12.912.556-4.703-2.58-5.987-2.58-5.987l11.168-3.206Z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", { id: "pachydermLogo_svg__f", fill: "#fff" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#pachydermLogo_svg__d" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#pachydermLogo_svg__d", fill: "url(#pachydermLogo_svg__e)" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { mask: "url(#pachydermLogo_svg__f)" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(0 60.926)" },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", { id: "pachydermLogo_svg__h", fill: "#fff" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#pachydermLogo_svg__g" })),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#4F6486", d: "M1.18 37.934s1.532-16.053 9.199-17.067c7.658-1.013 8.883-.963 12.211 1.926 4.089 3.549 2.535 5.168 3.436 5.168.9 0 5.498-2.937 4.633-8.345-.836-5.23 4.868-10.72 16.996-10.226 12.127.493-13.937-3.563-13.937-3.563L8.675 15.628S1.69 24.753 1.52 31.682l-.34 6.252Z", mask: "url(#pachydermLogo_svg__h)" }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#4C3D6A", d: "M43.112 50.104s-12.337-.076-12.256-1.668c.082-1.591.66-3.854.162-6.031-.1-.437 5.606.854 8.942-1.85 6.62-5.365.49-10.22.49-10.22s7.581 4.038 8.118 6.026c.965 3.572-5.456 13.743-5.456 13.743", mask: "url(#pachydermLogo_svg__h)" }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#4F728F", d: "M1.046 52.328s.243-9.215.332-13.688c.165-8.28 1.44-13.746 4.418-18.085 2.552-3.719 12.463-.494 16.18-5.418 7.66-10.144 19.587-6.433 19.587-6.433l21.809 4.717s-5.276 9.525-8.019 8.29c-1.874-.843-6.133-3.041-6.133-3.041s1.083 2.193 3.425 3.208c5.453 2.362 7.328 4.388 8.523 7.767.5 1.413 2.477 4.014 3.866 4.6a13.259 13.259 0 0 1 3.441 2.091c.194.164-.519 1.008-.343 1.177.157.152 1.524-.62 1.667-.466.156.168-.875 1.423-.736 1.593.14.169 1.478-.617 1.6-.447.175.24-1.325 1.104-1.183 1.342.102.17 1.507-.166 1.592 0 .358.698.576 1.36.665 1.933.342 2.196 1.536 3.716-1.697 9.971-2.367 4.581 10.047-6.766 10.047-6.766L49.897-11.58-4.428 15.323l4.112 37.174 1.363-.17Z", mask: "url(#pachydermLogo_svg__h)" }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#4C416D", d: "M67.127 25.08S61.24 9.451 61.324 7.845c.084-1.605-16.013 1.7-16.013 1.7l10.224 3.373c6.134 2.024-2.55 7.606-2.55 7.606l11.246 5.063 2.896-.509Z", mask: "url(#pachydermLogo_svg__h)" }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#4C3D6A", d: "M12.986 75.302S3.339 41.09 3.423 39.483c.084-1.605-.509-12.945 1.357-8.788.682 1.52 4.272 20.445 11.768 21.285 4.402.493 1.605 11.81 2.224 14.193 1.537 5.914-2.037 11.83-2.037 11.83l-3.75-2.7Z", mask: "url(#pachydermLogo_svg__h)" }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#5191A6", d: "M1.18 27.96c1.04-6.08 8.358-15.32 15.584-19.387 7.227-4.067 10.378-5.867 19.249-5.867 8.87 0-6.756-5.369-6.756-5.369L2.22 8.573s-4.91.996-5.08 7.924l4.04 11.464Z", mask: "url(#pachydermLogo_svg__h)" }))),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { filter: "url(#pachydermLogo_svg__i)", mask: "url(#pachydermLogo_svg__f)" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { transform: "translate(33.05 .091)" },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", { id: "pachydermLogo_svg__l", fill: "#fff" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", { xlinkHref: "#pachydermLogo_svg__j" })),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "url(#pachydermLogo_svg__k)", d: "M34.801 18.404c3.735 3.207 9.03 2.529 12.782 7.596 3.734 5.045-1.433 12.138-2.568 12.676-3.576 1.692-3.405 2.368-6.301 2.707-.965.114-2.456.096-4.173.078-3.44-.035-7.787-.07-10.627.946-4.258 1.523-3.085 3.043-7.172 5.58-4.087 2.538-10.9 5.922-13.793 9.135C.055 60.334-.454 64.897.74 66.755c1.194 1.858 4.773 3.884 14.483 4.047 9.71.163 12.099 4.893 15.846 4.721 1.855-.084 1.289-2.113.222-4.897l.307.503s3.303-1.995 4.427-4.227c1.19-2.367 4.254-7.776 6.809-8.623 2.948-.977 8.174-3.723 7.663-4.736-.719-1.423-5.283-1.518-5.283-1.518s5.833-2.175 6.132-2.707c2.374-4.24 5.72-12.15 3.734-21.126-2.392-10.813-12.784-10.638-15.851-12.326-6.324-3.48-4.458-12.84-4.458-12.84S35.11.66 33.406.323C32.81.205 32.36.066 32.033.066c-.605 0-.782.478-.67 2.455.172 3.042-1.675 11.492 3.438 15.883Z", mask: "url(#pachydermLogo_svg__l)" }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#4E567C", d: "M31.598 71.13s3.303-1.996 4.427-4.228c1.19-2.367 4.254-7.776 6.809-8.623 2.948-.977 8.174-3.722 7.663-4.736-.719-1.423-5.283-1.518-5.283-1.518s5.833-2.175 6.132-2.707c2.374-4.24 5.63-8.013 2.46-16.647-2.049-5.575-13.127-12.666-16.194-14.354-6.324-3.48-4.95-13.346-4.95-13.346s0-2.873-1.705-3.21c-1.703-.337-1.022-.337-.85 2.704.173 3.042-.42 9.548 4.694 13.939 3.735 3.207 9.288 4.979 13.039 10.046 3.735 5.045 9.206 10.471 4.099 16.22-2.62 2.95-12.09 8.288-15.156 9.473-2.717 1.05-7.495 1.695-8.517 1.526-4.465-.735-7.499-5.065-9.883-3.542-4.054 2.589 5.285 6.249 2.391 9.462C17.88 64.8 6.991 64.302 6.808 66.498c-.169 2.028.513 3.21 10.224 3.373 9.71.163 10.29 5.824 14.037 5.652 3.748-.171-2.39-8.278-2.564-14.53-.175-6.253-7.5-7.262-7.5-7.262", mask: "url(#pachydermLogo_svg__l)" }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#5DA7B5", d: "M19.743 47.901c2.724-3.55 3.746-3.889 6.471-4.397 1.84-.344 7.098-.124 11.472-.535.277-.026.599.992.972.992s-.05-1.948.362-2.025c.411-.077 1.254 2.141 1.637 2.025.384-.115-.51-2.123 0-2.271.51-.148 1.535 1.862 1.83 1.707.293-.156-.578-1.707-.291-2.096.287-.39.537.584.584.558 4.723-2.54 6.601-6.37 6.766-9.185.169-2.873-3.241-6.927-3.241-6.927L20.913 12.413s.585-9.885 10.725-11.328c3.578-.51-.374 5.568 3.756 12.84 2.136 3.76 7.33 3.072 12.306 6.332.344.226.887-.382 1.11-.213.222.169-.556.744.314 1.443.87.698 1.245-.468 1.57-.152.324.316-.884.926 0 1.674.882.748 1.34-.252 1.638.122.299.373-.612.823-.22 1.26 1.23 1.378 1.273 1.862 1.86 4.224 1.847 7.411 1.096 5.822 3.584 8.785 4.71 5.61-21.967 13.702-21.967 13.702l31.513-4.92-1.922-6.725-43.45-80.613-24.12 109.35s4.593-9.636 10.553-13.526c7.2-4.7 8.857-3.216 11.58-6.767Z", mask: "url(#pachydermLogo_svg__l)" }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#4C416D", d: "m33.558 72.058-2.456-1.66s-1.63-6.316-2.491-8.307c-1.024-2.366-1.098-3.54-4.091-4.223-8.86-2.022-3.58-4.56-3.58-4.56s5.792 1.517 7.158 5.572c.574 1.705 1.026 6.252 3.581 6.25 2.556-.001 3.405-3.888 5.619-5.242 2.214-1.353 3.746-3.044 5.79-3.383 2.044-.34 7.495-.343 7.495-.343L33.558 72.058Z", mask: "url(#pachydermLogo_svg__l)" }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#4E567C", d: "M30.647 49.415c2.555-1.353 3.066-.509 4.599-1.523 1.533-1.015-5.624-2.7-8.008-1.347-1.363.773-1.944 5.645-.507 6.421 3.75 2.026 1.807-2.433 3.916-3.55Z", mask: "url(#pachydermLogo_svg__l)" })))),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#4F6486", d: "M31.123 139.998c1.134-4.884 1.534-5.565-1.547-9.163-2.053-2.399-3.192-4.184-3.417-5.357-.089 1.607.902 3.567 2.972 5.881 3.106 3.472.206 9.532 1.568 13.546.907 2.676 1.47 4.64 1.687 5.892-.274-2.376-.603-4.418-.988-6.126-.19-.846-.731-2.706-.275-4.673Z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#4B2A5C", d: "M71.707 86.34s4.568-.132 5.962-.51c1.874-.508 4.6-.68 4.599-1.862l-2.94-.858-4.634 1.607-.166.448-2.82 1.175Z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "url(#pachydermLogo_svg__m)", d: "M88.118 42.31c-4.163 3.34-10.016 5.245-12.602 6.598-3.236 1.692-1.19 4.225-.849 4.9 3.06-.869 9.197-3.385 13.113-6.598 6.694-5.492 9.53-14.708 8.679-14.876a.177.177 0 0 0-.033-.003c-.896 0-3.937 6.472-8.308 9.978", transform: "translate(0 31.093)" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#D3CBAF", d: "M74.667 84.902c-1.258-1.942-.918-2.788-.918-2.788s1.363 1.182 3.748.336c2.752-.977 6.395-2.412 10.558-5.752 4.427-3.552 7.49-9.468 7.49-9.468s-1.071 5.581-7.765 11.073c-3.916 3.214-10.054 5.73-13.113 6.6" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#020408", d: "M61.989 79.115c0-.626.51-1.134 1.14-1.134.63 0 1.142.507 1.142 1.132 0 .626-.51 1.134-1.14 1.135-.63 0-1.142-.507-1.142-1.133" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#D5B8D8", d: "M63.695 78.572a.34.34 0 0 1-.34.338.34.34 0 0 1-.341-.338.34.34 0 0 1 .34-.338.34.34 0 0 1 .341.338" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#FE9B7C", d: "m66.439.034 11.965 11.053-.631 6.345L65.095 5.72z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#D06868", d: "m66.471 0-1.376 5.72-11.262 11.995 1.344-5.686z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { fill: "#A5597E", d: "m65.127 5.686 12.678 11.713-11.294 12.029-12.678-11.713z" }))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgPachydermLogo);


/***/ }),

/***/ "./lib/utils/components/Svgs/StatusWarning.js":
/*!****************************************************!*\
  !*** ./lib/utils/components/Svgs/StatusWarning.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const SvgStatusWarning = (props) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", Object.assign({ width: 20, height: 20, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, props),
    react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { fill: "none", fillRule: "evenodd" },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M0 0h16v16H0z" }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 11.65a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm0-9.7a1.2 1.2 0 0 0-1.2 1.2v5.6a1.2 1.2 0 1 0 2.4 0v-5.6A1.2 1.2 0 0 0 8 1.95Z", fill: "#BF444F" }))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgStatusWarning);


/***/ }),

/***/ "./lib/utils/hooks/usePreviousValue.js":
/*!*********************************************!*\
  !*** ./lib/utils/hooks/usePreviousValue.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const usePreviousValue = (value) => {
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        ref.current = value;
    });
    return ref.current;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (usePreviousValue);


/***/ }),

/***/ "./lib/utils/hooks/useSort.js":
/*!************************************!*\
  !*** ./lib/utils/hooks/useSort.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "numberComparator": () => (/* binding */ numberComparator),
/* harmony export */   "stringComparator": () => (/* binding */ stringComparator),
/* harmony export */   "useSort": () => (/* binding */ useSort)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const stringComparator = (a, b) => {
    if (a > b) {
        return 1;
    }
    else if (a < b) {
        return -1;
    }
    return 0;
};
const numberComparator = (a, b) => a - b;
const useSort = ({ data, initialSort = {
    func: () => 1,
    name: '',
    accessor: (a) => a,
}, initialDirection = 1, }) => {
    const [direction, setDirection] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialDirection);
    const [comparator, setComparator] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialSort);
    const handleSetComparator = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((newComparator) => {
        setComparator((oldComparator) => {
            if (newComparator.name === oldComparator.name ||
                newComparator.reverse) {
                setDirection(-1 * direction);
            }
            else {
                setDirection(1);
            }
            return newComparator;
        });
    }, [direction]);
    const sortedData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        return [...data].sort((a, b) => {
            return (direction *
                comparator.func(comparator.accessor(a), comparator.accessor(b)));
        });
    }, [comparator, data, direction]);
    return {
        sortedData,
        reversed: direction === -1,
        setComparator: handleSetComparator,
        comparatorName: comparator.name,
        numberComparator,
        stringComparator,
    };
};


/***/ }),

/***/ "./lib/utils/icons.js":
/*!****************************!*\
  !*** ./lib/utils/icons.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileIcon": () => (/* binding */ fileIcon),
/* harmony export */   "infoIcon": () => (/* binding */ infoIcon),
/* harmony export */   "mountLogoIcon": () => (/* binding */ mountLogoIcon),
/* harmony export */   "repoIcon": () => (/* binding */ repoIcon)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_icons_file_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../style/icons/file.svg */ "./style/icons/file.svg");
/* harmony import */ var _style_icons_mount_logo_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../style/icons/mount-logo.svg */ "./style/icons/mount-logo.svg");
/* harmony import */ var _style_icons_repo_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../style/icons/repo.svg */ "./style/icons/repo.svg");
/* harmony import */ var _style_icons_info_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../style/icons/info.svg */ "./style/icons/info.svg");





const fileIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'jupyterlab-pachyderm:file',
    svgstr: _style_icons_file_svg__WEBPACK_IMPORTED_MODULE_1__["default"],
});
const mountLogoIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'jupyterlab-pachyderm:mount-logo',
    svgstr: _style_icons_mount_logo_svg__WEBPACK_IMPORTED_MODULE_2__["default"],
});
const repoIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'jupyterlab-pachyderm:repo',
    svgstr: _style_icons_repo_svg__WEBPACK_IMPORTED_MODULE_3__["default"],
});
const infoIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'jupyterlab-pachyderm:info',
    svgstr: _style_icons_info_svg__WEBPACK_IMPORTED_MODULE_4__["default"],
});


/***/ }),

/***/ "./style/icons/file.svg":
/*!******************************!*\
  !*** ./style/icons/file.svg ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg  viewBox=\"0 0 21 31\" width=\"21px\" height=\"31px\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M.85.001C.365.055-.003.491 0 1.008v28.19c0 .556.425 1.007.95 1.007h18.98c.524 0 .949-.45.949-1.007V6.608a1.04 1.04 0 00-.277-.713l-5.299-5.6a.923.923 0 00-.662-.294H.949a.895.895 0 00-.099 0zm1.048 2.014h11.705v4.698c0 .556.425 1.007.949 1.007h4.429v20.472H1.898V2.015zm13.603 1.332l2.234 2.36h-2.234v-2.36zM4.646 12.083a.949.949 0 00-.797.549c-.154.32-.135.704.05 1.007a.935.935 0 00.846.457h6.327a.94.94 0 00.833-.499 1.06 1.06 0 000-1.015.94.94 0 00-.833-.5H4.745a.895.895 0 00-.099 0zm0 4.698a.949.949 0 00-.797.549c-.154.32-.135.705.05 1.007a.935.935 0 00.846.458h11.389a.94.94 0 00.833-.5 1.06 1.06 0 000-1.015.94.94 0 00-.833-.499H4.745a.895.895 0 00-.099 0zm0 4.699a.949.949 0 00-.797.548c-.154.321-.135.705.05 1.007a.935.935 0 00.846.458h11.389a.94.94 0 00.833-.5 1.06 1.06 0 000-1.014.94.94 0 00-.833-.5H4.745a.895.895 0 00-.099 0z\" fill=\"#582F6B\" fill-rule=\"nonzero\"/>\n</svg>\n");

/***/ }),

/***/ "./style/icons/info.svg":
/*!******************************!*\
  !*** ./style/icons/info.svg ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><defs><path d=\"M10 0c5.5228475 0 10 4.4771525 10 10s-4.4771525 10-10 10S0 15.5228475 0 10 4.4771525 0 10 0Zm0 2c-4.418278 0-8 3.581722-8 8s3.581722 8 8 8 8-3.581722 8-8-3.581722-8-8-8Zm1.52 7.76v6.672H8.48V9.76h3.04ZM10 3.568c.5546667 0 1.0026667.14666667 1.344.44.3413333.29333333.512.66933333.512 1.128 0 .48-.1706667.87733333-.512 1.192-.3413333.31466667-.7893333.472-1.344.472-.55466667 0-1.00266667-.15466667-1.344-.464-.34133333-.30933333-.512-.69333333-.512-1.152 0-.45866667.17066667-.84266667.512-1.152.34133333-.30933333.78933333-.464 1.344-.464Z\" id=\"infoa\"/></defs><g fill=\"none\" fill-rule=\"evenodd\"><path fill=\"none\" d=\"M0 0h20v20H0z\"/><mask id=\"infob\" fill=\"#fff\"><use xlink:href=\"#infoa\"/></mask><use fill=\"#000\" fill-rule=\"nonzero\" xlink:href=\"#infoa\"/><g mask=\"url(#infob)\" fill=\"currentcolor\"><path d=\"M0 0h20v20H0z\"/></g></g></svg>");

/***/ }),

/***/ "./style/icons/mount-logo.svg":
/*!************************************!*\
  !*** ./style/icons/mount-logo.svg ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"20px\" height=\"20px\" viewBox=\"0 0 20 20\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <defs>\n        <path d=\"M14,13 L14,17.041 L10,19 L6,17.041 L6,13 L10,14.8365 L14,13 Z M10,10 L14,12.0852339 L10,14 L6,12.0852339 L10,10 Z M10.9899912,1 L10.9899912,5.72256 L12.5999411,4.16117749 L14,5.51882251 L10.7000295,8.71882251 C10.3617408,9.04686292 9.83953975,9.08786797 9.455273,8.84183766 L9.37515866,8.78472348 L9.29997054,8.71882251 L6,5.51882251 L7.40005893,4.16117749 L9.01000884,5.72256 L9.01000884,1 L10.9899912,1 Z\" id=\"path-1\"></path>\n    </defs>\n    <g id=\"Icons\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g id=\"Icon/notebook-mount/black\">\n            <rect id=\"Bounding-Box\"  class=\"jp-icon3\" fill-opacity=\"0\" fill=\"#FFFFFF\" x=\"0\" y=\"0\" width=\"20\" height=\"20\"></rect>\n            <mask id=\"mask-2\" fill=\"white\">\n                <use xlink:href=\"#path-1\"></use>\n            </mask>\n            <use id=\"Combined-Shape\" fill=\"#926AA1\" fill-rule=\"nonzero\" xlink:href=\"#path-1\"></use>\n            <g class=\"jp-icon3\" id=\"Group\" mask=\"url(#mask-2)\" fill=\"#0F1012\">\n                <g id=\"Color\">\n                    <rect x=\"0\" y=\"0\" width=\"20\" height=\"20\"></rect>\n                </g>\n            </g>\n        </g>\n    </g>\n</svg>");

/***/ }),

/***/ "./style/icons/repo.svg":
/*!******************************!*\
  !*** ./style/icons/repo.svg ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"20px\" height=\"20px\" viewBox=\"0 0 20 20\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <title>Icon/notebook-repo/black</title>\n    <defs>\n        <path d=\"M18,7 L18,15.082 L10,19 L2,15.082 L2,7 L10,10.673 L18,7 Z M10,1 L18,5.17046787 L10,9 L2,5.17046787 L10,1 Z\" id=\"path-1\"></path>\n    </defs>\n    <g id=\"Icons\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g id=\"Icon/notebook-repo/black\">\n            <mask id=\"mask-2\" fill=\"white\">\n                <use xlink:href=\"#path-1\"></use>\n            </mask>\n            <use id=\"Combined-Shape\" fill=\"#926AA1\" fill-rule=\"nonzero\" xlink:href=\"#path-1\"></use>\n            <g id=\"Group\" mask=\"url(#mask-2)\" fill=\"#0F1012\">\n                <g id=\"Color\">\n                    <rect x=\"0\" y=\"0\" width=\"20\" height=\"20\"></rect>\n                </g>\n            </g>\n        </g>\n    </g>\n</svg>");

/***/ })

}]);
//# sourceMappingURL=lib_index_js-webpack_sharing_consume_default_lumino_coreutils.7b6042d94ad71834e56c.js.map