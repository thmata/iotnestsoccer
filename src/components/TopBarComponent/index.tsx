import Image from "next/image";

export default function TopBarComponent() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <a href=""><Image src={"/logo-iotnest.png"} alt="logo" /></a>
        </div>
    );
}
