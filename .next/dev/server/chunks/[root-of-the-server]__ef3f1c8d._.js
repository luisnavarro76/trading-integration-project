module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/sign_in/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const runtime = "nodejs";
function getBackendBaseUrl() {
    return process.env.BACKEND_API_BASE_URL ?? ("TURBOPACK compile-time value", "") ?? "https://backend.vibefund.ing/api";
}
function getTokenCookieName() {
    return process.env.AUTH_TOKEN_COOKIE_NAME ?? "vibefund_token";
}
function getUserIdCookieName() {
    return process.env.AUTH_USER_ID_COOKIE_NAME ?? "vibefund_user_id";
}
async function backendSignIn(backendBaseUrl, walletId) {
    // JSON first (from app), fallback to multipart form-data (like Postman screenshot).
    const jsonRes = await fetch(`${backendBaseUrl}/sign_in`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            wallet_id: walletId
        }),
        cache: "no-store"
    });
    if (jsonRes.ok) return jsonRes;
    const form = new FormData();
    form.set("wallet_id", walletId);
    return fetch(`${backendBaseUrl}/sign_in`, {
        method: "POST",
        body: form,
        cache: "no-store"
    });
}
async function readWalletId(req) {
    const contentType = req.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
        const body = await req.json().catch(()=>null);
        const walletId = typeof body?.wallet_id === "string" ? body.wallet_id : typeof body?.walletAddress === "string" ? body.walletAddress : null;
        return walletId?.trim() ? walletId.trim() : null;
    }
    // form-data or x-www-form-urlencoded
    const form = await req.formData().catch(()=>null);
    if (!form) return null;
    const raw = form.get("wallet_id") ?? form.get("walletAddress") ?? form.get("address");
    if (typeof raw !== "string") return null;
    const walletId = raw.trim();
    return walletId ? walletId : null;
}
async function POST(req) {
    try {
        const walletId = await readWalletId(req);
        if (!walletId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing wallet_id"
            }, {
                status: 400
            });
        }
        const backendBaseUrl = getBackendBaseUrl();
        let backendRes;
        try {
            backendRes = await backendSignIn(backendBaseUrl, walletId);
        } catch (err) {
            console.error("Failed to reach auth backend:", err);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Failed to reach auth backend"
            }, {
                status: 502
            });
        }
        const text = await backendRes.text();
        let data = null;
        try {
            data = JSON.parse(text);
        } catch  {
        // ignore
        }
        if (!backendRes.ok || !data?.token) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Sign-in failed",
                details: data ?? text
            }, {
                status: backendRes.status || 500
            });
        }
        const cookieName = getTokenCookieName();
        const userIdCookieName = getUserIdCookieName();
        const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            user_id: data.user_id
        });
        res.cookies.set(cookieName, data.token, {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30
        });
        // Keep user_id readable by the client if needed (e.g. for form submissions).
        res.cookies.set(userIdCookieName, data.user_id, {
            httpOnly: false,
            secure: ("TURBOPACK compile-time value", "development") === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30
        });
        return res;
    } catch (err) {
        console.error("sign_in route error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal Server Error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ef3f1c8d._.js.map