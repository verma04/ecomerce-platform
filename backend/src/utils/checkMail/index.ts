const tempEmailDomains = [
  "mailinator.com",
  "duck.com",
  // add more temp email domains here
];

export const isTemporaryEmail = (email: string) => {
  const domain = email.split("@")[1];
  return tempEmailDomains.includes(domain);
};
