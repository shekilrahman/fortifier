import { Text } from "@react-three/drei";

export default function ThreeText({ children, position = [0, 0, 0], fontSize = 1, color = "white", ...props }) {
    return (
        <Text
            position={position}
            fontSize={fontSize}
            color={color}
            anchorX="center"
            anchorY="middle"
            {...props}
        >
            {children}
        </Text>
    );
}
