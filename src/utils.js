export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  
  export const timeGreet = () => {
    const hour = (new Date()).getHours();
    if (hour >= 5 && hour < 12)  {
      return "Good Morning, ";
    }
    if (hour >= 12 && hour < 17) {
      return "Good Afternoon, ";
    }
    if ((hour >= 17 && hour <= 24) || (hour >= 0 && hour < 5)) {
      return "Good Evening, ";
    }
    return "Hi, "
  }