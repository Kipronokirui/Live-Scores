import { Shield } from 'lucide-react-native';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import LeagueDetailsMatchCard from './LeagueDetailsMatchCard';

export default function InfoTab({dummyLeagueData}) {
  return (
    <View>
      <Text style={styles.sectionTitle}>STANDING</Text>
      <View style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Shield size={40} color="#fff" />
          <View style={styles.infoHeaderText}>
            <Text style={styles.infoLeagueName}>Premier League</Text>
            <Text style={styles.infoTeamsCount}>20 Teams</Text>
          </View>
        </View>
        <View style={styles.infoTable}>
          <View style={styles.infoTableHeader}>
            <Text style={styles.infoTableHeaderText}>Pos Team</Text>
            <Text style={styles.infoTableHeaderText}>P</Text>
            <Text style={styles.infoTableHeaderText}>W</Text>
            <Text style={styles.infoTableHeaderText}>Pts</Text>
          </View>
          {dummyLeagueData.standings.slice(0, 3).map((team, index) => (
            <View key={team.id} style={styles.infoTableRow}>
              <View style={styles.infoTeamCell}>
                <Text style={styles.infoPosition}>{index + 1}</Text>
                <Image source={{ uri: team.logo }} style={styles.infoTeamLogo} />
                <Text style={styles.infoTeamName}>{team.name}</Text>
              </View>
              <Text style={styles.infoTableCell}>{team.played}</Text>
              <Text style={styles.infoTableCell}>{team.won}</Text>
              <Text style={styles.infoTableCell}>{team.points}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Shield size={40} color="#fff" />
          <View style={styles.infoHeaderText}>
            <Text style={styles.infoLeagueName}>Premier League</Text>
            <Text style={styles.infoTeamsCount}>Recent Matches (101)</Text>
          </View>
        </View>
        {dummyLeagueData.matches.slice(0, 2).map((match) => (
          <LeagueDetailsMatchCard key={match.id} match={match} />
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
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5B6B8E',
    padding: 16,
  },
  infoHeaderText: {
    marginLeft: 12,
  },
  infoLeagueName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  infoTeamsCount: {
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 2,
  },
  infoTable: {
    padding: 16,
  },
  infoTableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
  },
  infoTableHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
  },
  infoTableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  infoTeamCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoPosition: {
    width: 20,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  infoTeamLogo: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  infoTeamName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  infoTableCell: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
});