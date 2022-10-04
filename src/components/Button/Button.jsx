import { LoadMoreBtn } from "./Button.styled";
import {LoaderBox} from "../Loader/Loader.styled";
export const Button = () => {
    return (
        <LoaderBox>
            <LoadMoreBtn type="button">
        Load more
    </LoadMoreBtn>
        </LoaderBox>
        )
}