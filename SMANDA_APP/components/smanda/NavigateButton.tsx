import { useRouter } from "expo-router";
import { AlertDialog, Button, Center } from "native-base";

function NavigateButton(props: { goto: string }) {
    const router = useRouter();

    return (
        <Center>
            <Button
                colorScheme="danger"
                onPress={() => {
                    router.push(props.goto);
                }}>
                Go To Three
            </Button>
        </Center>
    );
}

export default NavigateButton;
