import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Text, View } from '../../components/Themed';
import { StyleSheet, TextInput, Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          header: () => (
            <View style={styles.separator}>
              <Text style={styles.title}>홈</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: '모든할일',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />,
          header: () => (
            <View style={styles.separator}>
              <Link style={styles.topLink} href="/" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="angle-left"
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <Text style={styles.title}>모든할일</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  topLink: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  }
});

