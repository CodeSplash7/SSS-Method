export default function parseUrl(urlString: string) {
    const url = new URL(urlString, "http://localhost"); // Base added for relative URLs

    const route = url.pathname; // Extract the route
    const queryParams = Object.fromEntries(url.searchParams.entries()); // Convert query params to an object

    return {
        route,
        queryParams,
        toString() {
            const queryString = new URLSearchParams(
                this.queryParams,
            ).toString();
            return `${this.route}${queryString ? `?${queryString}` : ""}`;
        },
    };
}
