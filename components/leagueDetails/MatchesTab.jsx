import {
    View
} from 'react-native';
import LeagueDetailsMatchCard from './LeagueDetailsMatchCard';

export default function MatchesTab({dummyLeagueData}) {
  return (
    <View>
      {dummyLeagueData.matches.map((match) => (
        <LeagueDetailsMatchCard key={match.id} match={match} />
      ))}
    </View>
  );
}