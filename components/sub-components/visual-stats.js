import { useEffect, useState } from "react";

import { useLoaded } from "@/context/loading";
import Card from "./card";
import ChartTabs from "./chart-tabs";

const VisualStats = ({ data }) => {
    const { globalLoaded } = useLoaded();
    const [price, setPrice] = useState(null);

    const formatPrices = async () => {
        const arrayOfObj = Object.entries(
            data?.PRICE?.data["Monthly Adjusted Time Series"]
        ).map((e) => ({ date: e[0], ...e[1] }));
        setPrice(arrayOfObj);
    };

    useEffect(() => {
        if (data) formatPrices();
    }, [data]);

    return (
        <Card rowSpan={{ base: 2, md: 3, lg: 6 }} colSpan={{ base: 2, lg: 8 }}>
            <ChartTabs
                priceData={price}
                newsData={data?.NEWS?.data?.feed}
                isPriceLoaded={globalLoaded}
                isNewsLoaded={globalLoaded}
            />
        </Card>
    );
};

export default VisualStats;
