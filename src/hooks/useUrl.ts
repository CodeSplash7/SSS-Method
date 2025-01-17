import parseUrl from "@/general-utils/parse-url";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

const useUrl = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [urlObject, setUrlObject] = useState(parseUrl(window.location.href));

    // Keep local state in sync with query params
    useEffect(() => {
        const currentUrl = parseUrl(window.location.href);
        setUrlObject(currentUrl);
    }, [searchParams.toString()]);

    const updateQueryParamsTo = useCallback(
        (newQueryParams: Record<string, string | null> | null) => {
            if (!newQueryParams) return urlObject;

            const updatedUrlObject = { ...urlObject };
            updatedUrlObject.queryParams = {
                ...updatedUrlObject.queryParams,
                ...newQueryParams,
            };

            Object.keys(updatedUrlObject.queryParams).forEach((key) => {
                if (updatedUrlObject.queryParams[key] === null) {
                    delete updatedUrlObject.queryParams[key];
                }
            });

            setUrlObject(updatedUrlObject);
            return updatedUrlObject.queryParams;
        },
        [urlObject],
    );

    const updateRouteTo = useCallback((newRoute: string | null) => {
        if (!newRoute) return urlObject.route;

        setUrlObject((prev) => ({ ...prev, route: newRoute }));
        return newRoute;
    }, []);

    const goToUrl = useCallback(
        (
            route: string | null,
            queryParams: Record<string, string | null> | null,
        ) => {
            const updatedUrlObject = {
                ...urlObject,
                route: updateRouteTo(route),
                queryParams: updateQueryParamsTo(
                    urlObject.queryParams.redirect
                        ? { ...queryParams, redirect: null }
                        : queryParams,
                ),
            };
            console.log(
                urlObject.queryParams.redirect
                    ? { ...queryParams, redirect: null }
                    : queryParams,
            );
            router.push(updatedUrlObject.toString());
        },
        [],
    );

    return [urlObject, updateQueryParamsTo, updateRouteTo, goToUrl] as [
        typeof urlObject,
        typeof updateQueryParamsTo,
        typeof updateRouteTo,
        typeof goToUrl,
    ];
};

export default useUrl;
