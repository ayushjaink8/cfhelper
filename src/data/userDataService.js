import axios from "axios";
import { CF_API_URL } from "../config/constants";

async function sleep(timeInMilliSeconds) {
  return new Promise((resolve) => setTimeout(resolve, timeInMilliSeconds));
}

const makeCodeforcesRequest = async (config) => {
  let tries = 0;
  let errorMsg = null;
  while (tries < 5) {
    tries += 1;
    try {
      const data = await axios
        .request(config)
        .then((response) => {
          if (response.data && response.data.status === "OK") {
            return { status: "OK", data: response.data };
          } else {
            return {
              status: "FAILED",
              error:
                errorMsg || "Unable to fetch data. Codeforces API may be down.",
            };
          }
        })
        .catch((error) => {
          errorMsg = error.message.toString();
        });
      if (data.status && data.status === "OK") return data;
      await sleep(500);
    } catch (error) {
      errorMsg = error.message.toString();
    }
  }
  return {
    status: "FAILED",
    error: errorMsg || "Unable to fetch data. Codeforces API may be down.",
  };
};

const fetchUserData = async (handle) => {
  if (!handle) {
    return {
      status: "FAILED",
      error: "handles: Field should not be empty",
    };
  }
  const res = await makeCodeforcesRequest({
    method: "get",
    url: `${CF_API_URL}/user.status/`,
    params: {
      handle: handle,
      lang: "en",
    },
  });

  if (res && res.status && res.status === "OK") {
    if (res.data.length < 1) {
      return {
        status: "FAILED",
        error: "No Submissions Found",
      };
    }
    return res.data;
  }
  if (res && res.error) {
    if (
      res.error === "Cannot read properties of undefined (reading 'status')"
    ) {
      res.error = `handles: User with handle ${handle} not found`;
    }
    return {
      status: "FAILED",
      error: res.error,
    };
  }
  return {
    status: "FAILED",
    error: `Unable to fetch user's submissions\n`,
  };
};

const computeData = (data) => {

  var verdicts = {};
  var langs = {};
  var tags = {};
  var levels = {};
  var ratings = {};
  var problems = {};
  var totalSub = 0;
  var heatmap = {};
  var heatmapData = {};
  var years = 0;

  for (var i = data.length - 1; i >= 0; i--) {
    var sub = data[i];

    // creating unique key for problem {contestID + problem name + problem rating}
    var rating;
    if (sub.problem.rating === undefined) {
      rating = 0;
    } else {
      rating = sub.problem.rating;
    }

    var problemId =
      sub.problem.contestId + "-" + sub.problem.name + "-" + rating;

    // previous id for removing duplicates
    var problemIdprev =
      sub.problem.contestId - 1 + "-" + sub.problem.name + "-" + rating;

    // next id for removing duplicates
    var problemIdnext =
      sub.problem.contestId + 1 + "-" + sub.problem.name + "-" + rating;

    // checking if problem previously visited
    if (problems[problemIdprev] !== undefined) {
      if (problems[problemIdprev].solved === 0) {
        problems[problemIdprev].attempts++;
      }
      problemId = problemIdprev;
    } else if (problems[problemIdnext] !== undefined) {
      if (problems[problemIdnext].solved === 0) {
        problems[problemIdnext].attempts++;
      }
      problemId = problemIdnext;
    } else if (problems[problemId] !== undefined) {
      if (problems[problemId].solved === 0) {
        problems[problemId].attempts++;
      }
    } else {
      problems[problemId] = {
        problemlink: sub.contestId + "-" + sub.problem.index, // link of problem
        attempts: 1,
        solved: 0, // We also want to save how many submission got AC, a better name would have been number_of_ac
      };
    }

    if (sub.verdict === "OK") {
      problems[problemId].solved++;
    }

    // modifying level, rating, and tag counter on first AC.
    if (problems[problemId].solved === 1 && sub.verdict === "OK") {
      sub.problem.tags.forEach(function (t) {
        if (tags[t] === undefined) tags[t] = 1;
        else tags[t]++;
      });

      if (levels[sub.problem.index[0]] === undefined)
        levels[sub.problem.index[0]] = 1;
      else levels[sub.problem.index[0]]++;

      if (sub.problem.rating) {
        if (ratings[sub.problem.rating] === undefined) {
          ratings[sub.problem.rating] = 1;
        } else {
          ratings[sub.problem.rating]++;
        }
      }
    }

    // changing counter of verdict submission
    if (verdicts[sub.verdict] === undefined) verdicts[sub.verdict] = 1;
    else verdicts[sub.verdict]++;

    // changing counter of launguage submission
    if (langs[sub.programmingLanguage] === undefined)
      langs[sub.programmingLanguage] = 1;
    else langs[sub.programmingLanguage]++;

    // updating the heatmap
    var date = new Date(sub.creationTimeSeconds * 1000); // submission date
    date.setHours(0, 0, 0, 0);
    if (heatmap[date.valueOf()] === undefined) heatmap[date.valueOf()] = 1;
    else heatmap[date.valueOf()]++;
    totalSub = data.length;

    // how many years are there between first and last submission
    years =
      new Date(data[0].creationTimeSeconds * 1000).getYear() -
      new Date(
        data[data.length - 1].creationTimeSeconds * 1000
      ).getYear();
    years = Math.abs(years) + 1;
  }

  
  return {
    verdicts,
    langs,
    tags,
    levels,
    ratings,
    problems,
    totalSub,
    heatmap,
    heatmapData,
    years,
    
  }

};


const fetchTableData = async (handle) => {
  if (!handle) {
    return {
      status: "FAILED",
      error: "handles: Field should not be empty",
    };
  }
  const res = await makeCodeforcesRequest({
    method: "get",
    url: `${CF_API_URL}/user.rating/`,
    params: {
      handle: handle,
      lang: "en",
    },
  });

  if (res && res.status && res.status === "OK") {
    if (res.data.length < 1) {
      return {
        status: "FAILED",
        error: "No Contests Found",
      };
    }
    return res.data;
  }
  if (res && res.error) {
    if (
      res.error === "Cannot read properties of undefined (reading 'rating')"
    ) {
      res.error = `handles: User with handle ${handle} not found`;
    }
    return {
      status: "FAILED",
      error: res.error,
    };
  }
  return {
    status: "FAILED",
    error: `Unable to fetch user's submissions\n`,
  };
};

const computeTableData = (data, problems) => {

  var best = 1e10;
  var worst = -1e10;
  var maxUp = 0;
  var maxDown = 0;
  var bestCon = '';
  var worstCon = '';
  var maxUpCon = '';
  var maxDownCon = '';
  var tot = data.length;

  data.forEach((con) => {
    // con is a contest
    if (con.rank < best) {
      best = con.rank;
      bestCon = con.contestId;
    }
    if (con.rank > worst) {
      worst = con.rank;
      worstCon = con.contestId;
    }
    var ch = con.newRating - con.oldRating;
    if (ch > maxUp) {
      maxUp = ch;
      maxUpCon = con.contestId;
    }
    if (ch < maxDown) {
      maxDown = ch;
      maxDownCon = con.contestId;
    }
  });

  var tried = 0;
  var solved = 0;
  var maxAttempt = 0;
  var maxAttemptProblem = '';
  var maxAc = '';
  var maxAcProblem = '';
  var unsolved = [];
  var solvedWithOneSub = 0;

  for (var p in problems) {
    tried++;
    if (problems[p].solved > 0) solved++;
    if (problems[p].solved === 0) unsolved.push(problems[p].problemlink);

    if (problems[p].attempts > maxAttempt) {
      maxAttempt = problems[p].attempts;
      maxAttemptProblem = problems[p].problemlink;
    }
    if (problems[p].solved > maxAc) {
      maxAc = problems[p].solved;
      maxAcProblem = problems[p].problemlink;
    }

    if (problems[p].solved > 0 && problems[p].attempts === 1) solvedWithOneSub++;
  }


  return {
    best,
    worst,
    maxUp,
    maxDown,
    bestCon,
    worstCon,
    maxUpCon,
    maxDownCon,
    tot,

    tried,
    solved,
    maxAttempt,
    maxAttemptProblem,
    maxAc,
    maxAcProblem,
    solvedWithOneSub,
    unsolved
  }

}

function Get_url(p) {
  if(typeof(p) == "number"){
    return 'https://codeforces.com/contest/' + p;
  }
  var con = p.split('-')[0];
  var index = p.split('-')[1];

  var url = '';
  if (con.length <= 4)
    url = 'https://codeforces.com/contest/' + con + '/problem/' + index;
  else url = 'https://codeforces.com/problemset/gymProblem/' + con + '/' + index;

  return url;
}


async function fetchDoubleUsersData(handle1, handle2) {

  if (!handle1 || !handle2) {
    return {
      status: "FAILED",
      error: "handles: Fields should not be empty.",
    };
  } else if (handle1 === handle2){
    return {
      status: "FAILED",
      error: "handles: Both handles should be different.",
    };
  }

  const res1 = await makeCodeforcesRequest({
    method: "get",
    url: `${CF_API_URL}/user.status/`,
    params: {
      handle: handle1,
      lang: "en",
    },
  });

  const res2 = await makeCodeforcesRequest({
    method: "get",
    url: `${CF_API_URL}/user.status/`,
    params: {
      handle: handle2,
      lang: "en",
    },
  });

  if (res1 && res1.status && res1.status === "OK"  && res2 && res2.status && res2.status === "OK"  ) {
    return {
      res1: res1.data,
      res2: res2.data,
      status: "OK"
    };
  }
  if (res1 && res1.error) {
    if (
      res1.error === "Cannot read properties of undefined (reading 'status')"
    ) {
      res1.error = `handles: User with handle ${handle1} not found`;
    }
    return {
      status: "FAILED",
      error: res1.error,
    };
  } else if (res2 && res2.error){
    if (
      res2.error === "Cannot read properties of undefined (reading 'status')"
    ) {
      res2.error = `handles: User with handle ${handle2} not found`;
    }
    return {
      status: "FAILED",
      error: res2.error,
    };
  }

}

async function fetchDoubleTableData(handle1, handle2) {

  if (!handle1 || !handle2) {
    return {
      status: "FAILED",
      error: "handles: Fields should not be empty.",
    };
  } else if (handle1 === handle2){
    return {
      status: "FAILED",
      error: "handles: Both handles should be different.",
    };
  }

  const res1 = await makeCodeforcesRequest({
    method: "get",
    url: `${CF_API_URL}/user.status/`,
    params: {
      handle: handle1,
      lang: "en",
    },
  });

  const res2 = await makeCodeforcesRequest({
    method: "get",
    url: `${CF_API_URL}/user.status/`,
    params: {
      handle: handle2,
      lang: "en",
    },
  });

  if (res1 && res1.status && res1.status === "OK"  && res2 && res2.status && res2.status === "OK"  ) {
    return {
      res1: res1.data,
      res2: res2.data,
      status: "OK"
    };
  }
  if (res1 && res1.error) {
    if (
      res1.error === "Cannot read properties of undefined (reading 'status')"
    ) {
      res1.error = `handles: User with handle ${handle1} not found`;
    }
    return {
      status: "FAILED",
      error: res1.error,
    };
  } else if (res2 && res2.error){
    if (
      res2.error === "Cannot read properties of undefined (reading 'status')"
    ) {
      res2.error = `handles: User with handle ${handle2} not found`;
    }
    return {
      status: "FAILED",
      error: res2.error,
    };
  }


  return {
    status: "FAILED",
    error: `Unable to connect with the Codeforces API at the moment.\n`
  };

}




const userDataService = {
  fetchUserData,
  computeData,
  fetchTableData,
  computeTableData,
  fetchDoubleUsersData,
  fetchDoubleTableData,
  Get_url,
};

export default userDataService;
