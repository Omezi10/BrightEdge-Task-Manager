import { P } from '../lib/data';

export default function Icon({ n, style }) {
  return <svg className="ic" viewBox="0 0 24 24" style={style} dangerouslySetInnerHTML={{ __html: P[n] }} />;
}