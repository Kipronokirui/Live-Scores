import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function TeamsTab({dummyLeagueData}) {
  return (
    <View>
      <Text style={styles.sectionTitle}>PLAYERS</Text>
      <View style={styles.playersGrid}>
        {dummyLeagueData.players.map((player) => (
          <View key={player.id} style={styles.playerCard}>
            <Image source={{ uri: player.image }} style={styles.playerImage} />
            <Text style={styles.playerName}>{player.name}</Text>
            <Text style={styles.playerCountry}>{player.country}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3D4F6D',
    textAlign: 'center',
    marginVertical: 20,
    letterSpacing: 1,
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  playerCard: {
    width: '48%',
    backgroundColor: '#F0F2F5',
    borderRadius: 12,
    padding: 16,
    margin: '1%',
    alignItems: 'center',
  },
  playerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  playerCountry: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});