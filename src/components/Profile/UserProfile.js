import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";

const UserProfile = (props) => {
  return (
    <section className={classes.profile}>
      <h1>Your Profile</h1>
      <ProfileForm orderOwnerName={props.orderOwnerName} />
    </section>
  );
};

export default UserProfile;
