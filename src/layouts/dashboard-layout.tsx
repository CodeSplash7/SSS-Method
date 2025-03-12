export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="z-30 w-full h-screen flex flex-col justify-start items-center">
            {children}
        </div>
    );
}
