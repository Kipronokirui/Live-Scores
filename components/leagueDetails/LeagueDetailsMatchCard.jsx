import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function LeagueDetailsMatchCard({ match }) {
  return (
      <View style={styles.matchCard}>
        <View style={styles.matchStatus}>
          <Text style={styles.matchStatusText}>{match.status}</Text>
        </View>
        <View style={styles.matchContent}>
          <View style={styles.matchTeam}>
            <Image source={{ uri: match.homeTeam.logo }} style={styles.matchTeamLogo} />
            <Text style={styles.matchTeamName}>{match.homeTeam.name}</Text>
          </View>
          <View style={styles.matchScore}>
            <Text style={styles.scoreText}>
              {match.homeScore} - {match.awayScore}
            </Text>
            <Text style={styles.matchDate}>{match.date}</Text>
          </View>
          <View style={styles.matchTeam}>
            <Image source={{ uri: match.awayTeam.logo }} style={styles.matchTeamLogo} />
            <Text style={styles.matchTeamName}>{match.awayTeam.name}</Text>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  matchCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  matchStatus: {
    backgroundColor: '#5B6B8E',
    paddingVertical: 8,
    alignItems: 'center',
  },
  matchStatusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  matchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  matchTeam: {
    flex: 1,
    alignItems: 'center',
  },
  matchTeamLogo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  matchTeamName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  matchScore: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3D4F6D',
  },
  matchDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});