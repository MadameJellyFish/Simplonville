import { Link } from 'expo-router';
import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Button({ label, theme }) {

    if (theme === "contact") {
        return (
            <View style={styles.buttonContainer}>
                <Link href="/contact" asChild>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonLabel}>{label}</Text>
                    </Pressable>
                </Link>
            </View>
        );
    } else if (theme === "submit") {
        return (
            <View style={styles.buttonContainer}>
                <Link href="index" asChild>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonLabel}>{label}</Text>
                    </Pressable>
                </Link>
            </View>
        );
    }
    else {
        return (
        <View style={styles.buttonContainer}>
            <Pressable onPress={onPress}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
        );
      }
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        marginTop: 50,
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: '#5f5ff5',
        backgroundColor: '#5f5ff5',
        borderRadius:50,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});