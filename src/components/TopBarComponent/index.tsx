import Image from "next/image";

export default function TopBarComponent() {
    return (
        <div className="flex bg-white shadow-md px-[5rem] py-[1rem]">
            <a href="/"><Image src={"/logo-iotnest.png"} alt="logo" width={154} height={43} /></a>
        </div>
    );
}
