import { useCallback } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

const supportedURL = 'https://github.com/ssharonrose';

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return <IconButton icon="github" size={50} title={children} onPress={handlePress} iconSize={100} />;
};

const AboutPage = () => {
    return (
        <View style={styles.container}>
            <Text>Developer Name: Sharon Rose </Text>
            <OpenURLButton url={supportedURL}></OpenURLButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default AboutPage