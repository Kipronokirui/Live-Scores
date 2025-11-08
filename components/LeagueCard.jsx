import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function LeagueCard({ league }) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{league.icon}</Text>
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {league.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 160,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 40,
  },
  name: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: '#6B7280',
    lineHeight: 18,
  },
});