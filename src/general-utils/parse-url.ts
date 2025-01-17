export default function parseUrl(urlString: string) {
    const url = new URL(urlString, "http://localhost"); // Base added for relative URLs

    const route = url.pathname; // Extract the route
    const queryParams = Object.fromEntries(
        url.searchParams.entries(),
    ) as Record<string, string | null>;
    // Convert query params to an object

    return {
        route,
        queryParams,
        toString() {
            Object.keys(queryParams).forEach((key) => {
                if (queryParams[key] === null) {
                    delete queryParams[key];
                }
            });

            const queryString = new URLSearchParams(
                this.queryParams as Record<string, string>,
            ).toString();
            return `${this.route}${queryString ? `?${queryString}` : ""}`;
        },
    };
}
