"use client";

import Questionnaire from "@/general-utils/Questionnaire";
import useUrl from "@/hooks/useUrl";
import { useEffect, useState } from "react";

export default function QuestionStatement() {
    const [URL] = useUrl();

    const [statement, setStatement] = useState(
        Questionnaire[Number(URL.queryParams.questionIndex)]?.statement,
    );

    useEffect(() => {
        (async () => {
            setStatement(
                Questionnaire[Number(URL.queryParams.questionIndex)]?.statement,
            );
        })();
    }, [URL.queryParams.questionIndex]);
    return <>{statement}</>;
}
