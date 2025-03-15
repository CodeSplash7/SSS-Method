import clsx from "clsx";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["600"],
    style: ["italic", "normal"],
});

const FutureIcon =
    "M3 18V6L12 12L3 18ZM13 18V6L22 12L13 18ZM5 14.25L8.4 12L5 9.75V14.25ZM15 14.25L18.4 12L15 9.75V14.25Z";
const PresentIcon =
    "M8.5 19.0002V5.00018L19.5 12.0002L8.5 19.0002ZM10.5 15.3502L15.75 12.0002L10.5 8.65018V15.3502Z";

export default async function TrainingEssentials() {
    return (
        <div
            className={`w-full h-fit 
                        flex flex-col justify-start items-center 
                        gap-[32px] py-[32px] md:px-[24px] 2xl:gap-[64px] 2xl:py-[32px]`}
        >
            <Title />
            <Columns>
                <Column>
                    <ColumnTitle
                        colorHEX="#1CBAC8"
                        title="Equipment Now"
                        icon={PresentIcon}
                    />
                    <ColumnContent
                        emoji="✅"
                        itemList={["item1", "item2", "item3"]}
                    />
                    <ColumnWarning
                        msg={"❗ You CAN'T train properly without these."}
                    />
                </Column>
                <Column>
                    <ColumnTitle
                        colorHEX="#D30C7B"
                        title="Equipment Future"
                        icon={FutureIcon}
                    />
                    <ColumnContent
                        emoji="✅"
                        itemList={["item4", "item5", "item6"]}
                    />
                    <ColumnWarning
                        msg={"⚡ These will be VERY important in the future!"}
                    />{" "}
                </Column>
            </Columns>
            <Warnings />
        </div>
    );
}

const Title = () => (
    <div
        className={`w-full h-fit gap-[4px]
                            flex items-center justify-center `}
    >
        <div className={`hidden w-fit h-fit text-[24px] md:inline-block `}>
            🛠
        </div>
        <div
            className={` w-full h-fit 
                        text-[16px] ${montserrat.className} font-[500] italic text-center text-black  md:w-fit md:text-[24px]`}
        >
            Your Training Essentials
        </div>
        <div className={`hidden w-fit h-fit text-[24px] md:inline-block `}>
            🛠
        </div>
    </div>
);

const Columns = ({ children }: { children: React.ReactNode }) => (
    <div
        className={`w-full h-fit gap-[8px]
                    flex sm:flex-row flex-col justify-start items-start md:gap-0`}
    >
        {children}
    </div>
);

const Column = ({ children }: { children: React.ReactNode }) => (
    <div
        className={`w-full h-fit gap-[16px]
                        flex flex-col justify-start items-center
                         md:gap-[32px]`}
    >
        {children}
    </div>
);

const ColumnTitle = ({
    colorHEX,
    title,
    icon,
}: {
    colorHEX: string;
    title: string;
    icon: string;
}) => {
    const hexToRGB = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r},${g},${b}`;
    };
    return (
        <div
            style={{ "--colorRGB": hexToRGB(colorHEX) } as React.CSSProperties}
            className={`
                w-full h-fit gap-[4px] py-[8px] flex items-center justify-center md:gap-[10px] 2xl:py-[16px]
                bg-[rgb(var(--colorRGB))]
                md:[background:linear-gradient(90deg,rgba(var(--colorRGB),0)_0%,rgba(var(--colorRGB),1)_35%,rgba(var(--colorRGB),1)_65%,rgba(var(--colorRGB),0)_100%)]
                2xl:[background:linear-gradient(90deg,rgba(var(--colorRGB),0)_0%,rgba(var(--colorRGB),1)_50%,rgba(var(--colorRGB),0)_100%)]`}
        >
            <svg
                className={`w-[12px] h-[12px] md:w-[24px] md:h-[24px] 2xl:h-full`}
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d={icon} fill="white" />
            </svg>
            <div
                className={`w-fit h-fit font-[600] ${montserrat.className} text-[12px] text-center text-white md:text-[16px] 2xl:text-[20px]`}
            >
                {title}
            </div>
        </div>
    );
};

const ColumnContent = ({
    itemList,
    emoji,
}: {
    emoji: string;
    itemList: string[];
}) => (
    <div
        className={`w-[154px] h-fit gap-[12px] justify-start items-start md:w-full md:gap-[16px]`}
    >
        {itemList.map((item, index) => (
            <div
                key={index}
                className={`w-full h-fit flex items-center justify-center gap-[12px] md:gap-[16px]`}
            >
                <div
                    className={`w-fit h-fit text-[10px] md:text-[14px] 2xl:text-[16px]`}
                >
                    {emoji}
                </div>
                <div
                    className={`w-fit h-fit text-[10px] ${montserrat.className} font-[600] text-center text-black md:text-[14px] 2xl:text-[16px]`}
                >
                    {item}
                </div>
            </div>
        ))}
    </div>
);

const ColumnWarning = ({ msg }: { msg: string }) => (
    <div className="w-full h-fit flex flex-col items-start justify-start px-[8px] md:hidden">
        <Warning msg={msg} />
    </div>
);

const Warnings = () => (
    <div
        className={`w-full h-fit hidden justify-center items-start gap-[16px] md:flex`}
    >
        <Warning msg={"❗ You CAN'T train properly without these."} />
        <Warning msg={"⚡ These will be VERY important in the future!"} />
    </div>
);

const Warning = ({ msg }: { msg: string }) => (
    <div
        className={`w-full h-fit 
                         ${montserrat.className} font-[600] text-[14px] text-black text-center
                         2xl:text-[20px]`}
    >
        {msg}
    </div>
);
