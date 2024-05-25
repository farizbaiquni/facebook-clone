export enum ActivityOptions {
  Celebrating,
  Watching,
  Eating,
  Drinking,
  Attending,
  FlyingTo,
}

export type ActivityType = {
  option: ActivityOptions;
  label: string;
  activityIcon: string;
};

export const activities: ActivityType[] = [
  {
    option: ActivityOptions.Celebrating,
    label: "Celebrating...",
    activityIcon: "/icons/activities/celebrating.png",
  },
  {
    option: ActivityOptions.Watching,
    label: "Watching...",
    activityIcon: "/icons/activities/watching.png",
  },
  {
    option: ActivityOptions.Eating,
    label: "Eating...",
    activityIcon: "/icons/activities/eating.png",
  },
  {
    option: ActivityOptions.Drinking,
    label: "Drinking...",
    activityIcon: "/icons/activities/drinking.png",
  },
  {
    option: ActivityOptions.Attending,
    label: "Attending...",
    activityIcon: "/icons/activities/attending.png",
  },
  {
    option: ActivityOptions.FlyingTo,
    label: "Flying To...",
    activityIcon: "/icons/activities/flying-to.png",
  },
];

export type SubActivityType = {
  label: string;
  activityIcon: string;
};

export const subActivitiesMap = new Map<ActivityOptions, SubActivityType[]>([
  [
    ActivityOptions.Celebrating,
    [
      {
        label: "friendship",
        activityIcon: "/icons/activities/sub_activity/friendship.png",
      },
      {
        label: "a birthday",
        activityIcon: "/icons/activities/sub_activity/birthday.png",
      },
      {
        label: "your special day",
        activityIcon: "/icons/activities/sub_activity/special-day.png",
      },
      {
        label: "birthdays",
        activityIcon: "/icons/activities/sub_activity/birthday.png",
      },
      {
        label: "success",
        activityIcon: "/icons/activities/sub_activity/success.png",
      },
      {
        label: "my son's birthday",
        activityIcon: "/icons/activities/sub_activity/birthday.png",
      },
      {
        label: "my daughter's birthday",
        activityIcon: "/icons/activities/sub_activity/birthday.png",
      },
    ],
  ],
]);
