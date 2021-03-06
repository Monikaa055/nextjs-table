import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/icons/Add";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import FilterListIcon from "@material-ui/icons/FilterList";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { format } from "date-fns";
import EnhancedTable from "../src/ui/EnhancedTable";
const useStyles = makeStyles((theme) => ({
  service: {
    fontWeight: 300,
  },
  button: {
    color: "#ffffff",
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

function createData(
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total,
  search
) {
  return {
    name,
    date,
    service,
    features,
    complexity,
    platforms,
    users,
    total,
    search,
  };
}

export default function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();
  const [rows, setRows] = useState([
    createData(
      "Monika",
      "11/2/19",
      "Website",
      "E-Commerce",
      "N/A",
      "N/A",
      "N/A",
      "$1500",
      true
    ),
    createData(
      "Bill Gates",
      "11/2/19",
      "Website",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Simply dummy text of the printing and typesetting industry. ",
      "N/A",
      "N/A",
      "N/A",
      "$1500",
      true
    ),
    createData(
      "Elon Musk",
      "11/2/19",
      "Website",
      "Lorem Ipsum is simply dummy text. ",
      "N/A",
      "N/A",
      "N/A",
      "$1500",
      true
    ),
    createData(
      "Steve Jobs",
      "11/2/19",
      "Website",
      "E-Commerce",
      "N/A",
      "N/A",
      "N/A",
      "$1500",
      true
    ),
    createData(
      "Bil Gates",
      "11/2/19",
      "Website",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Simply dummy text of the printing and typesetting industry. ",
      "N/A",
      "N/A",
      "N/A",
      "$1500",
      true
    ),
    createData(
      "Elon Msk",
      "11/2/19",
      "Website",
      "Lorem Ipsum is simply dummy text. ",
      "N/A",
      "N/A",
      "N/A",
      "$1500",
      true
    ),
    createData(
      "Ste Jobs",
      "11/2/19",
      "Website",
      "E-Commerce",
      "N/A",
      "N/A",
      "N/A",
      "$1500",
      true
    ),
  ]);

  const platformOptions = ["Web", "iOS", "Android"];
  let featureOptions = [
    "Photo/Video",
    "GPS",
    "File Transfer",
    "User/Authentication",
    "Biometrics",
    "Push Notifications",
  ];
  let websiteOptions = ["Basic", "Interactive", "E-Commerce"];
  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iosChecked, setIosChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState("");
  const [service, setService] = useState("");
  const [complexity, setComplexity] = useState("");
  const [users, setUsers] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(0);
  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, "MM/dd/yy"),
        service,
        features.join(", "),
        service === "Website" ? "N/A" : complexity,
        service === "Website" ? "N/A" : platforms.join(", "),
        service === "Website" ? "N/A" : users,
        `$${total}`,
        true
      ),
    ]);
    setDialogOpen(false);
    setName("");
    setDate(new Date());
    setTotal("");
    setService("");
    setComplexity("");
    setUsers("");
    setPlatforms([]);
    setFeatures([]);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    const rowData = rows.map((row) =>
      Object.values(row).filter((option) => option !== true && option !== false)
    );

    const matches = rowData.map((row) =>
      row.map((option) =>
        option.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );

    const newRows = [...rows];
    matches.map((row, index) =>
      row.includes(true)
        ? (newRows[index].search = true)
        : (newRows[index].search = false)
    );

    setRows(newRows);
    setPage(0);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container>
        <Grid container direction="column">
          <Grid item style={{ marginTop: "2em", marginLeft: "5em" }}>
            <Typography variant="h1">Projects</Typography>
          </Grid>
          <Grid item>
            <TextField
              placeholder="Search project details or create a new entry."
              style={{ width: "35em", marginLeft: "5em" }}
              value={search}
              onChange={handleSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => setDialogOpen(true)}
                  >
                    <AddIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item style={{ marginLeft: "5em", marginTop: "2em" }}>
            <FormGroup row>
              <FormControlLabel
                style={{ marginRight: "5em" }}
                control={
                  <Switch
                    checked={websiteChecked}
                    color="primary"
                    onChange={() => setWebsiteChecked(!websiteChecked)}
                  />
                }
                label="Websites"
                labelPlacement="start"
              />

              <FormControlLabel
                style={{ marginRight: "5em" }}
                control={
                  <Switch
                    checked={iosChecked}
                    color="primary"
                    onChange={() => setIosChecked(!iosChecked)}
                  />
                }
                label="iOS Apps"
                labelPlacement="start"
              />

              <FormControlLabel
                style={{ marginRight: "5em" }}
                control={
                  <Switch
                    checked={androidChecked}
                    color="primary"
                    onChange={() => setAndroidChecked(!androidChecked)}
                  />
                }
                label="Android"
                labelPlacement="start"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={softwareChecked}
                    color="primary"
                    onChange={() => setSoftwareChecked(!softwareChecked)}
                  />
                }
                label="CustomSoftware"
                labelPlacement="start"
              />
            </FormGroup>
          </Grid>

          <Grid item style={{ marginTop: "5em", marginBottom: "35em" }}>
            <EnhancedTable rows={rows} setPage={setPage} />
          </Grid>
        </Grid>
        <Dialog
          fullWidth
          maxWidth="md"
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        >
          <Grid container justify="center">
            <Grid item style={{ marginTop: "2em" }}>
              <Typography variant="h1" gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container justify="space-between">
              <Grid item>
                <Grid item container direction="column" sm>
                  <Grid item>
                    <TextField
                      label="Name"
                      fullWidth
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  style={{ marginTop: 16 }}
                >
                  <Grid item>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction="column" sm>
                  <Grid item>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      value={total}
                      id="total"
                      label="Total"
                      onChange={(event) => setTotal(event.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify="space-between">
              <Grid
                item
                container
                direction="column"
                style={{ marginTop: "5em" }}
                sm
              >
                <Grid item>
                  <Typography variant="h4">Service</Typography>

                  <RadioGroup
                    aria-label="service"
                    name="service"
                    value={service}
                    onChange={(event) => {
                      setService(event.target.value);
                      setFeatures([]);
                    }}
                  >
                    <FormControlLabel
                      classes={{ label: classes.service }}
                      value="Website"
                      label="Website"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      classes={{ label: classes.service }}
                      value="Mobile App"
                      label="Mobile App"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      classes={{ label: classes.service }}
                      value="Custom Software"
                      label="Custom Software"
                      control={<Radio />}
                    />
                  </RadioGroup>
                </Grid>
                <Grid item style={{ marginTop: "5em" }}>
                  <Select
                    labelId="platforms"
                    disabled={service === "Website"}
                    id="platforms"
                    style={{ width: "12em" }}
                    multiple
                    displayEmpty
                    renderValue={
                      platforms.length > 0 ? undefined : () => "Platforms"
                    }
                    value={platforms}
                    onChange={(event) => setPlatforms(event.target.value)}
                  >
                    {platformOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="column"
                style={{ marginTop: "5em" }}
                sm
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h4">Complexity</Typography>

                  <RadioGroup
                    aria-label="complexity"
                    name="complexity"
                    value={complexity}
                    onChange={(event) => setComplexity(event.target.value)}
                  >
                    <FormControlLabel
                      disabled={service === "Website"}
                      classes={{ label: classes.service }}
                      value="Low"
                      label="Low"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      disabled={service === "Website"}
                      classes={{ label: classes.service }}
                      value="Medium"
                      label="Medium"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      disabled={service === "Website"}
                      classes={{ label: classes.service }}
                      value="High"
                      label="High"
                      control={<Radio />}
                    />
                  </RadioGroup>
                </Grid>
                <Grid item style={{ marginTop: "5em" }}>
                  <Select
                    labelId="feature"
                    style={{ width: "12em" }}
                    MenuProps={{ style: { zIndex: 1302 } }}
                    id="feature"
                    multiple
                    displayEmpty
                    renderValue={
                      features.length > 0 ? undefined : () => "Feature"
                    }
                    value={features}
                    onChange={(event) => setFeatures(event.target.value)}
                  >
                    {service === "Website"
                      ? (featureOptions = websiteOptions)
                      : null}
                    {featureOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="column"
                style={{ marginTop: "5em" }}
                sm
                alignItems="flex-end"
              >
                <Grid item>
                  <Typography variant="h4">Users</Typography>

                  <RadioGroup
                    aria-label="users"
                    name="users"
                    value={users}
                    onChange={(event) => setUsers(event.target.value)}
                  >
                    <FormControlLabel
                      disabled={service === "Website"}
                      classes={{ label: classes.service }}
                      value="0-10"
                      label="0-10"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      disabled={service === "Website"}
                      classes={{ label: classes.service }}
                      value="10-100"
                      label="10-100"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      disabled={service === "Website"}
                      classes={{ label: classes.service }}
                      value="100+"
                      label="100+"
                      control={<Radio />}
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: "3em" }}>
              <Grid item>
                <Button
                  color="primary"
                  style={{ fontWeight: 300 }}
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={addProject}
                  disabled={
                    service === "Website"
                      ? name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        features.length > 1
                      : name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        users.length === 0 ||
                        complexity.length === 0 ||
                        platforms.length === 0 ||
                        service.length === 0
                  }
                >
                  Add Project +
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Container>
    </MuiPickersUtilsProvider>
  );
}
