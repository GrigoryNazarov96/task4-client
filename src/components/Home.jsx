import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { deleteUsers, fetchUsers, changeUsersStatus } from '../http/requests';

const Home = ({ user, setUser }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);

  const handleSelect = (row, isSelect) => {
    if (isSelect) {
      setSelectedUsers([...selectedUsers, row._id]);
    } else {
      setSelectedUsers(selectedUsers.filter((u) => u !== row._id));
    }
  };

  const handleSelectAll = (isSelect) => {
    if (isSelect) {
      setSelectedUsers(users.map((u) => u._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleChangeUserStatus = async (isBlock) => {
    await changeUsersStatus(selectedUsers, isBlock);
    if (isBlock && selectedUsers.includes(user._id)) {
      setUser();
    }
    const updatedUsers = users.map((u) => {
      if (selectedUsers.includes(u._id)) {
        u.isBlocked = isBlock;
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  const handleDelete = async () => {
    if (selectedUsers.includes(user._id)) {
      await deleteUsers(selectedUsers);
      setUser();
      return;
    }
    await deleteUsers(selectedUsers);
    setUsers(users.filter((u) => !selectedUsers.includes(u._id)));
  };

  const columns = [
    {
      dataField: '_id',
      text: 'User ID',
    },
    {
      dataField: 'name',
      text: 'User Name',
    },
    {
      dataField: 'email',
      text: 'User Email',
    },
    {
      dataField: 'registredAt',
      text: 'Registration Date',
    },
    {
      dataField: 'lastSeenAt',
      text: 'Last Seen',
    },
    {
      dataField: 'isBlocked',
      text: 'Blocked',
      formater: (cellContent, row) => <>{cellContent}</>,
    },
  ];

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    onSelect: handleSelect,
    onSelectAll: handleSelectAll,
  };

  return (
    <Container className="mt-5">
      {selectedUsers.length !== 0 && (
        <div className="d-flex flex-row bd-highlight mb-3">
          <Button
            variant="warning"
            onClick={() => handleChangeUserStatus(true)}
          >
            Block
          </Button>
          <Button
            variant="success"
            className="ms-2"
            onClick={() => handleChangeUserStatus(false)}
          >
            Unblock
          </Button>
          <Button
            variant="danger"
            className="ms-2"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </div>
      )}
      <div>
        <BootstrapTable
          keyField="_id"
          data={users}
          columns={columns}
          selectRow={selectRow}
          remote
        />
      </div>
    </Container>
  );
};

export default Home;
