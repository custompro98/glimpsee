import SubmitInput from "@/components/SubmitInput";
import TextInput from "@/components/TextInput";

export default function New() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="flex flex-row justify-center w-full">
                <form className="flex flex-col space-y-4 w-2/3">
                    <TextInput
                        label="title"
                        placeholder="my really good blog post"
                    />
                    <TextInput label="background color" placeholder="#FFFFFF" />
                    <TextInput
                        label="icon"
                        placeholder="https://exmaple.com/my-public-image.png"
                    />
                    <SubmitInput size="xs" label="create" />
                </form>
            </div>
        </section>
    );
}
