export const timeGreet = () => {
  const hour = (new Date()).getHours();
  if (hour >= 5 && hour < 12) 
    return "Good Morning, ";
  if (hour >= 12 && hour < 17) 
    return "Good Afternoon, ";
  if ((hour >= 17 && hour <= 24) || (hour >= 0 && hour < 5))
    return "Good Evening, ";
  return "Hi, ";
}