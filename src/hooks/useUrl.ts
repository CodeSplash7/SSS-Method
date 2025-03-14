import parseUrl from "@/general-utils/parse-url";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useUrl = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [urlObject, setUrlObject] = useState(parseUrl(window.location.href));
    useEffect(() => {
        setUrlObject(parseUrl(window.location.href));
    }, [searchParams.toString()]);

    useEffect(() => {
        router.push(urlObject.toString());
    }, [urlObject]);

    return [urlObject, setUrlObject] as [typeof urlObject, typeof setUrlObject];
};

export default useUrl;
