import React from "react";
import { ActivityIndicator} from "react-native";
import styled from "styled-components";
import colors from "../theme/colors";

export default function LoadingIndicator() {
    return (
        <LoadingIndicatorContainer>
            <ActivityIndicator size="large" color="#fff" />
        </LoadingIndicatorContainer>
    );
}


const LoadingIndicatorContainer = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${colors.tertiaryBlack};
    justify-content: center;
    align-items: center;
`;