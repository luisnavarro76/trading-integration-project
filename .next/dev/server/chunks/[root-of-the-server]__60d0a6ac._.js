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
"[project]/app/api/new_app/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
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
function requireFormString(form, key) {
    const raw = form.get(key);
    if (typeof raw !== "string") return null;
    const trimmed = raw.trim();
    return trimmed ? trimmed : null;
}
function normalizeBoolean01(value) {
    if (!value) return "0";
    const v = value.trim().toLowerCase();
    if (v === "1" || v === "true" || v === "yes" || v === "on") return "1";
    return "0";
}
async function POST(req) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get(getTokenCookieName())?.value;
    const userId = cookieStore.get(getUserIdCookieName())?.value;
    if (!token) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    const contentType = req.headers.get("content-type") ?? "";
    let form = null;
    if (contentType.includes("application/json")) {
        const payload = await req.json().catch(()=>null);
        if (!payload?.app_link || !payload?.ticker_name || !payload?.launch_date || !payload?.launch_time) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing required fields"
            }, {
                status: 400
            });
        }
        form = new FormData();
        if (payload.app_name) form.set("app_name", payload.app_name);
        form.set("app_link", payload.app_link);
        form.set("ticker_name", payload.ticker_name);
        form.set("description", payload.description);
        form.set("is_x_connected", payload.is_x_connected ? "1" : "0");
        form.set("app_x_handle", payload.app_x_handle);
        if (payload.app_video_url) form.set("app_video_url", payload.app_video_url);
        form.set("launch_date", payload.launch_date);
        form.set("launch_time", payload.launch_time);
        if (payload.user_id) form.set("user_id", payload.user_id);
    } else {
        form = await req.formData().catch(()=>null);
    }
    if (!form) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid request body"
        }, {
            status: 400
        });
    }
    const requiredKeys = [
        "app_name",
        "app_link",
        "ticker_name",
        "launch_date",
        "launch_time"
    ];
    // If app_name is omitted, default it to ticker_name to avoid backend 422s.
    if (!requireFormString(form, "app_name")) {
        const fallbackName = requireFormString(form, "ticker_name");
        if (fallbackName) form.set("app_name", fallbackName);
    }
    // Ensure backend-required `user_id` exists (either from request or cookie).
    if (!requireFormString(form, "user_id") && userId) {
        form.set("user_id", userId);
    }
    // Normalize boolean value for backend expectations.
    const rawHandle = requireFormString(form, "app_x_handle") ?? "";
    const normalizedHandle = rawHandle.startsWith("@") ? rawHandle.slice(1) : rawHandle;
    if (normalizedHandle) {
        form.set("app_x_handle", normalizedHandle);
    }
    // If a handle is provided, force is_x_connected=1 to match backend expectations.
    form.set("is_x_connected", normalizedHandle ? "1" : normalizeBoolean01(requireFormString(form, "is_x_connected")));
    const missing = requiredKeys.filter((k)=>!requireFormString(form, k)).filter((k)=>k !== "app_name"); // app_name gets defaulted above when possible
    if (missing.length) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Missing required fields",
            missing
        }, {
            status: 400
        });
    }
    const logo = form.get("app_logo");
    if (!(logo instanceof Blob)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Missing app_logo"
        }, {
            status: 400
        });
    }
    if (!requireFormString(form, "user_id")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Missing required fields",
            missing: [
                "user_id"
            ]
        }, {
            status: 400
        });
    }
    const backendBaseUrl = getBackendBaseUrl();
    const backendRes = await fetch(`${backendBaseUrl}/new_app`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
            "x-requested-with": "XMLHttpRequest"
        },
        body: form,
        cache: "no-store"
    }).catch((err)=>{
        console.error("new_app backend fetch failed:", err);
        return null;
    });
    if (!backendRes) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to reach backend"
        }, {
            status: 502
        });
    }
    const backendContentType = backendRes.headers.get("content-type") ?? "";
    if (backendContentType.includes("text/html")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unauthorized",
            details: "Backend returned HTML response"
        }, {
            status: 401
        });
    }
    const text = await backendRes.text();
    let data = text;
    try {
        data = JSON.parse(text);
    } catch  {
    // ignore
    }
    if (!backendRes.ok) {
        const debugPayload = (()=>{
            const entries = {};
            form.forEach((value, key)=>{
                if (typeof value === "string") {
                    entries[key] = value;
                    return;
                }
                if (value instanceof Blob) {
                    entries[key] = `[file:${value.type || "unknown"}:${value.size}]`;
                    return;
                }
                entries[key] = "[unknown]";
            });
            return entries;
        })();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Backend error",
            status: backendRes.status || 500,
            details: data,
            sent: debugPayload
        }, {
            status: backendRes.status || 500
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__60d0a6ac._.js.map