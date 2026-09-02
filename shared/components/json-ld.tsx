type JsonLdProps = {
  data: object;
};

const JsonLd = ({ data }: JsonLdProps) => {
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
};

export default JsonLd;
