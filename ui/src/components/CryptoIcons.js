import { ReactComponent as IconEth } from 'cryptocurrency-icons/svg/color/eth.svg';
import { ReactComponent as IconNeo } from 'cryptocurrency-icons/svg/color/neo.svg';
import { ReactComponent as IconUsdc } from 'cryptocurrency-icons/svg/color/usdc.svg';
import { ReactComponent as IconLink } from 'cryptocurrency-icons/svg/color/link.svg';
import { ReactComponent as IconTheta } from 'cryptocurrency-icons/svg/color/theta.svg';
import { ReactComponent as IconHex } from '../myIcons/hex.svg';
import { ReactComponent as IconTfuel } from '../myIcons/tfuel.svg';

const CryptoIcons = ({ symbol }) => {
  const size = '1.2rem';
  const Icons = {
    eth: <IconEth width={size} />,
    usdc: <IconUsdc width={size} />,
    link: <IconLink width={size} />,
    neo: <IconNeo width={size} />,
    hex: <IconHex width={size} />,
    theta: <IconTheta width={size} />,
    tfuel: <IconTfuel width={size} />,
  };
  const tag = Icons[symbol.toLowerCase()] ? Icons[symbol.toLowerCase()] : null;
  return <div>{tag}</div>;
};

export default CryptoIcons;
