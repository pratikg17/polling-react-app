import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Col, Row, Form, Input, Button, Space } from "antd";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { addPoll } from "../../redux/actions/pollActions";
import { message } from "antd";

function AddPoll() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(values) {
    let uniqMap = {};
    for (let i = 0; i < values.pollOptions.length; i++) {
      let po = values.pollOptions[i];
      if (uniqMap[po.optionName]) {
        message.error(`Please remove duplicate poll options ` + po.optionName);
        return;
      } else {
        uniqMap[po.optionName] = po;
      }
    }

    dispatch(addPoll(values));
  }

  let defaultOptions = [
    {
      optionName: "",
      required: true,
    },
    {
      optionName: "",
      required: true,
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form
            className="bs1 p-2"
            layout="vertical"
            form={form}
            onFinish={onFinish}
          >
            <h3>Add New Poll</h3>
            <hr />
            <Form.Item
              name="pollName"
              label="Poll Name"
              rules={[{ required: true, message: "Please input poll name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="pollDesc"
              label="Poll Description"
              rules={[{ required: true, message: "Add Poll Description" }]}
            >
              <Input />
            </Form.Item>
            <Form.List name="pollOptions" initialValue={defaultOptions}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space
                      size={"large"}
                      key={field.key}
                      style={{
                        display: "flex",
                        marginBottom: 8,
                        justifyContent: "center",
                        width: "100%",
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...field}
                        hidden
                        name={[field.name, "required"]}
                        fieldKey={[field.fieldKey, "required"]}
                      ></Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "optionName"]}
                        fieldKey={[field.fieldKey, "optionName"]}
                        rules={[
                          { required: true, message: "Add Poll option name" },
                        ]}
                      >
                        <Input placeholder="Poll Option Name" />
                      </Form.Item>

                      <Button
                        shape="circle"
                        danger
                        disabled={
                          form.getFieldValue([
                            "pollOptions",
                            field.name,
                            "required",
                          ])
                            ? true
                            : false
                        }
                        icon={<MinusOutlined />}
                        onClick={() => remove(field.name)}
                      ></Button>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      danger
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Poll Options
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <div className="text-right">
              <button className="btn1">ADD POLL</button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default AddPoll;
