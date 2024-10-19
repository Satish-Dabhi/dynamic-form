import * as React from "react";

import { Avatar, Box, SvgIcon, Tab, Tabs, Typography } from "@mui/material";
import { TabPanelProps, VerticalTabsProps } from "../interfaces/tabpanel";

import BadgeIcon from "@mui/icons-material/Badge";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import DynamicForm from "./DynamicForm";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import { label } from "../constants/label";

type FormNames =
  | "contactinformation"
  | "schoolinginformation"
  | "employmentdetails"
  | "hobbiesandinterests";

const iconMapping: Record<FormNames, JSX.Element> = {
  contactinformation: <PersonIcon />,
  schoolinginformation: <ContactEmergencyIcon />,
  employmentdetails: <BadgeIcon />,
  hobbiesandinterests: <SchoolIcon />,
};

function TabPanel(props: Readonly<TabPanelProps>) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className="w-full"
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs(props: Readonly<VerticalTabsProps>) {
  const [value, setValue] = React.useState(0);
  const [forms, setForms] = React.useState(props?.form);

  React.useEffect(() => {
    setForms(props?.form);
  }, [props?.form]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          boxShadow: "7px 10px 10px -2px rgba(136, 136, 136, 0.7)",
        }}
      >
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "700" }}>
            {forms.title}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontWeight: "400", color: "text.secondary" }}
          >
            {forms.description}
          </Typography>
        </Box>
        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "primary.main", marginRight: 2 }}>S</Avatar>
          <Typography variant="body1" sx={{ fontWeight: "600" }}>
            {label.AUTHOR_NAME}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Forms"
          sx={{
            boxShadow: "7px 10px 10px -2px rgba(136, 136, 136, 0.7)",
            border: "none",
            paddingTop: "2%",
            width: "300px",
          }}
        >
          {forms?.groups?.map((form: any, index: number) => {
            const icon = iconMapping[
              form?.title.toLowerCase()?.replaceAll(" ", "") as FormNames
            ] || <SvgIcon />;
            return (
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {icon}
                    <Typography sx={{ marginLeft: 1 }}>
                      {form?.title}
                    </Typography>
                  </Box>
                }
                {...a11yProps(index)}
                sx={{ textTransform: "inherit" }}
                key={index}
              />
            );
          })}
        </Tabs>
        {forms?.groups?.map((form: any, index: number) => (
          <TabPanel value={value} index={index} key={index}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {form?.title}
            </Typography>
            <DynamicForm
              formFields={form?.fields}
              formName={form?.title.toLowerCase()?.replaceAll(" ", "")}
            />
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
}
